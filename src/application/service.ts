import { Repository } from '../domain/repository.port'
import { InsufficientReadingsError, MissingTimeReading, ValidationError } from '../domain/errors'
import { Coordinates, Reading, Result, Service, Trip } from '../domain/service.port'
import { Geocoding } from '../domain/geocoding.port'
import { Logger } from 'pino'

/**
 * Implementación del servicio trips.
 */
export class TripsService implements Service {
    /**
     * @param logger - Servicio de geocodificacion externo
     * @param repository - Repositorio para acceder a los datos.
     * @param geocoding - Servicio de geocodificacion externo
     */
    constructor(
        private readonly logger: Logger,
        private readonly repository: Repository,
        private readonly geocoding: Geocoding,
    ) {
        this.logger = logger.child({ classId: 'TripsService' });
    }
    async getTrips(limit: number, offset: number, startGte?: number, startLte?: number, distanceGte?: number)
        : Promise<Result<Trip[]>> {
        if (startLte !== undefined && startGte !== undefined && startGte > startLte) {
            return [[], new ValidationError('start_lte', 'cannot be less than start_gte')]
        }

        if (startLte !== undefined && startLte < 0) {
            return [[], new ValidationError('start_lte', 'cannot be negative')]
        }

        if (startGte !== undefined && startGte < 0) {
            return [[], new ValidationError('start_gte', 'cannot be negative')]
        }

        if (limit < 0) {
            return [[], new ValidationError('limit', 'cannot be negative')]
        }
        if (offset < 0) {
            return [[], new ValidationError('offset', 'cannot be negative')]
        }

        if (distanceGte !== undefined && distanceGte < 0) {
            return [[], new ValidationError('offset', 'cannot be negative')]
        }

        const [trips, error] = await this.repository.findTrips(limit, offset, startGte, startLte, distanceGte)
        if (error !== null) {
            this.logger.error(error.name, error.message, error.stack)
            return [[], error]
        }

        return [trips, null]
    }
    async newTrip(readings: Reading[]): Promise<Result<string>> {
        if (readings.length < 5) {
            return ['', new InsufficientReadingsError(5)]
        }

        for (const reading of readings) {
            if (reading.time === undefined) {
                return ['', new MissingTimeReading()]
            }
        }
        let overspeedsCount = 0
        let overSpeed = false

        const start: Reading = readings[0]
        const end: Reading = readings.slice(-1)[0]

        let distance = 0.0

        let maxLat = readings[0].location.lat
        let minLat = readings[0].location.lat
        let maxLon = readings[0].location.lon
        let minLon = readings[0].location.lon

        for (let i = 0; i < readings.length; i++) {
            const reading = readings[i]
            if (reading.speed > reading.speedLimit) {
                if (!overSpeed) {
                    overspeedsCount++
                }
                overSpeed = true
            } else {
                overSpeed = false
            }

            if (i === 0) {
                continue
            }

            if (maxLat < reading.location.lat) maxLat = reading.location.lat
            if (minLat > reading.location.lat) minLat = reading.location.lat
            if (minLon > reading.location.lon) minLon = reading.location.lon
            if (maxLon < reading.location.lon) maxLon = reading.location.lon

            const prevReading = readings[i - 1]
            distance += this.calculateDistance(
                prevReading.location.lat, prevReading.location.lon,
                reading.location.lat, reading.location.lon
            )
        }

        if (end.time === undefined || start.time === undefined) {
            this.logger.error('missing time in records')
            return ['', new MissingTimeReading()]
        }

        const duration = end.time - start.time

        const boundingBox: Coordinates[] = [
            { lat: minLat, lon: minLon },
            { lat: minLat, lon: maxLon },
            { lat: maxLat, lon: maxLon },
            { lat: maxLat, lon: minLon },
        ]

        const roundStartLat = this.round(start.location.lat)
        const roundStartLon = this.round(start.location.lon)

        const roundEndLon = this.round(end.location.lon)
        const roundEndLat = this.round(end.location.lat)

        // Se va a buscar a la BD, si no existe, se va a buscar en el servicio de geocoding.
        // Si se redondea la lat y lon para no tener que ir a buscar todos los puntos.
        let [startAddress, startErr] = await this.repository.findAddress(roundStartLat, roundStartLon)
        if (startErr !== null) {
            [startAddress, startErr] = await this.geocoding.getAddress(roundStartLat, roundStartLon)
            if (startErr !== null) {
                this.logger.error(startErr.name, startErr.message, startErr.stack)
                return ['', startErr]
            }
            await this.repository.insertAddress(roundStartLat, roundStartLon, startAddress)
        }

        let [endAddress, endErr] = await this.repository.findAddress(roundEndLat, roundEndLon)
        if (endErr !== null) {
            [endAddress, endErr] = await this.geocoding.getAddress(roundEndLat, roundEndLon)
            if (endErr !== null) {
                this.logger.error(endErr.name, endErr.message, endErr.stack)
                return ['', endErr]
            }
            await this.repository.insertAddress(roundEndLat, roundEndLon, endAddress)
        }

        const trip: Trip = {
            start: {
                lat: start.location.lat,
                lon: start.location.lon,
                address: startAddress,
                time: start.time
            },
            end: {
                lat: end.location.lat,
                lon: end.location.lon,
                address: endAddress,
                time: end.time
            },
            distance,
            duration,
            overspeedsCount,
            boundingBox
        }

        const [tripId, error] = await this.repository.insertTrip(trip)

        if (error !== null) {
            this.logger.error(error.name, error.message, error.stack)
            return ['', error]
        }

        return [tripId, null]
    }

    /**
     * Calcula la distancia entre dos puntos geográficos usando la fórmula del haversine.
     * @param lat1 Latitud del primer punto en grados
     * @param lon1 Longitud del primer punto en grados
     * @param lat2 Latitud del segundo punto en grados
     * @param lon2 Longitud del segundo punto en grados
     * @returns La distancia entre los dos puntos en kilómetros
     */
    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371 // Radio de la Tierra en kilómetros
        const dLat = this.toRadians(lat2 - lat1)
        const dLon = this.toRadians(lon2 - lon1)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c
        return distance
    }

    /**
     * Convierte grados a radianes
     * @param degrees Ángulo en grados
     * @returns Ángulo en radianes
     */
    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180)
    }

    /**
     * Redondea un número a la precisión especificada.
     * @param num - Número a redondear.
     * @returns Número redondeado.
    */
    private round(num: number): number {
        return Math.round(num * 1000) / 1000;
    }
}
