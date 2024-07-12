import { Result } from '../../domain/service.port'
import { AddressNotFound } from '../../domain/errors'
import { Geocoding } from '../../domain/geocoding.port'
import axios from 'axios'
import { Logger } from 'pino'

export class OpenStreetMapGeocoding implements Geocoding {
    private readonly logger: Logger

    constructor(logger: Logger) {
        this.logger = logger.child({ classId: 'OpenStreetMapGeocoding' })
    }

    async getAddress(lat: number, lon: number): Promise<Result<string>> {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
                params: {
                    format: 'json',
                    lat: lat,
                    lon: lon
                },
                headers: {
                    'User-Agent': 'YourAppName/1.0' // Reemplaza con el nombre de tu aplicación
                }
            })

            if (response.data && response.data.display_name) {
                return [response.data.display_name, null]
            } else {
                this.logger.warn(`Address not found for coordinates: ${lat}, ${lon}`)
                return ['', new AddressNotFound(lat, lon)]
            }
        } catch (error) {
            this.logger.error('Error fetching address:', error)
            return ['', new Error('Error fetching address')]
        }
    }
}
