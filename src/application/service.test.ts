import { MockRepository } from "../adapters/repository.mock"
import { InsufficientReadingsError, MissingTimeReading, ValidationError } from "../domain/errors"
import { Coordinates, Service } from "../domain/service.port"
import { TripsService } from "./service"
import { addresses, correctTrip, geocodings, insufficientReadingsTrip, missingTimeTrip, trips } from "./service.test.data"
import { MockGeocoding } from "../adapters/geocoding.mock"

describe('Banking Service', () => {
    let mockRepository: MockRepository
    let service: Service
    let mockGeocoding: MockGeocoding
    beforeAll(async () => {
        mockRepository = new MockRepository(trips, addresses)
        mockGeocoding = new MockGeocoding(geocodings)
        service = new TripsService(mockRepository, mockGeocoding)
    })

    beforeEach(() => {
        jest.clearAllMocks()
        mockRepository.clearData()
    })

    describe('newTrip', () => {
        it('should correctly create a trip from valid readings', async () => {
            const [tripId, error] = await service.newTrip(correctTrip)
            expect(error).toBeNull()
            expect(tripId).toBeDefined()

            const savedTrip = mockRepository.trips.slice(-1)[0]
            // Verificar bounding box
            let expectedBoundingBox: Coordinates[] = [
                { lat: -33.586038, lon: -70.567265 },
                { lat: -33.586038, lon: -70.566408 },
                { lat: -33.580158, lon: -70.566408 },
                { lat: -33.580158, lon: -70.567265 }
            ]
            expect(savedTrip.boundingBox).toEqual(expectedBoundingBox)

            // Verificar start
            expect(savedTrip.start.time).toBe(1642500462000)
            expect(savedTrip.start.lat).toEqual(-33.580158)
            expect(savedTrip.start.lon).toEqual(-70.567227)

            // Verificar end
            expect(savedTrip.end.time).toBe(1642500486000)
            expect(savedTrip.end.lat).toEqual(-33.586038)
            expect(savedTrip.end.lon).toEqual(-70.567265)

            // Verificar duration
            expect(savedTrip.duration).toBe(24000)

            // Verificar distance (usando una tolerancia debido a posibles diferencias en el cálculo)
            expect(savedTrip.distance).toBeCloseTo(0.66, 1)

            // Verificar overspeedCount
            expect(savedTrip.overspeedsCount).toBe(2)
        })

        it('should return an error for insufficient readings', async () => {
            const [, error] = await service.newTrip(insufficientReadingsTrip)
            expect(error).toBeInstanceOf(InsufficientReadingsError)
            if (error !== null) {
                expect(error.message).toContain('At least 5 readings are required')
            }
        })

        it('should return an error when a reading is missing the time property', async () => {
            const [, error] = await service.newTrip(missingTimeTrip)
            expect(error).toBeInstanceOf(MissingTimeReading)
            if (error !== null) {
                expect(error.message).toContain('All readings must have a time property')
            }
        })
    })

    describe('get trips paginated', () => {
        it('should return an error if start_gte is bigger than start_lte', async () => {
            const [, error] = await service.getTrips(10, 0, 1720734776060, 1720734776050)
            expect(error).toBeInstanceOf(ValidationError)
        })

        it('should return an error if start_gte is negative', async () => {
            const [, error] = await service.getTrips(10, 0, -129)
            expect(error).toBeInstanceOf(ValidationError)
        })

        it('should return an error if start_gte is negative', async () => {
            const [, error] = await service.getTrips(10, 0, undefined, -129)
            expect(error).toBeInstanceOf(ValidationError)
        })

        it('should return an error if limit is negative', async () => {
            const [, error] = await service.getTrips(-10, 0)
            expect(error).toBeInstanceOf(ValidationError)
        })

        it('should return an error if offset is negative', async () => {
            const [, error] = await service.getTrips(10, -5)
            expect(error).toBeInstanceOf(ValidationError)
        })

        it('should return an error if distance_gte is negative', async () => {
            const [, error] = await service.getTrips(10, 0, undefined, undefined, -23)
            expect(error).toBeInstanceOf(ValidationError)
        })

        // estos test deberian ser de integracion ya que realmente es la BD la que hace ese trabajo
        it('should return 0 trips with limit = 0', async () => {
            const [trips, error] = await service.getTrips(0, 0)
            expect(error).toBeNull()
            expect(trips.length).toBe(0)
        })

        it('should return 0 trips with limit = 0', async () => {
            const [trips, error] = await service.getTrips(0, 0)
            expect(error).toBeNull()
            expect(trips.length).toBe(0)
        })

        it('should return correct number of trips with offset', async () => {
            const [trips, error] = await service.getTrips(3, 2)
            expect(error).toBeNull()
            expect(trips.length).toBe(3)
        })

        it('should return trips with distance greater than or equal to distance_gte', async () => {
            const [trips, error] = await service.getTrips(10, 0, undefined, undefined, 8.0)
            expect(error).toBeNull()
            expect(trips.length).toBeGreaterThan(0)
            for (let trip of trips) {
                expect(trip.distance).toBeGreaterThanOrEqual(8.0)
            }
        })

        it('should return trips within the specified time range', async () => {
            const startGte = 1642541000000 // 2022-01-18 19:10:00 UTC
            const startLte = 1642543000000 // 2022-01-18 19:43:20 UTC
            const [trips, error] = await service.getTrips(10, 0, startGte, startLte)
            expect(error).toBeNull()
            expect(trips.length).toBeGreaterThan(0)
            for (let trip of trips) {
                expect(trip.start.time).toBeGreaterThanOrEqual(startGte)
                expect(trip.start.time).toBeLessThanOrEqual(startLte)
            }
        })

        it('should return correct number of trips when limit is less than total', async () => {
            const [trips, error] = await service.getTrips(2, 0)
            expect(error).toBeNull()
            expect(trips.length).toBe(2)
        })

        it('should return all trips when limit exceeds total number of trips', async () => {
            const [trips, error] = await service.getTrips(100, 0)
            expect(error).toBeNull()
            expect(trips.length).toBe(5) // Asumiendo que hay 5 viajes en total en los datos de prueba
        })

        it('should return trips with at least one overspeed', async () => {
            const [trips, error] = await service.getTrips(10, 0)
            expect(error).toBeNull()
            const tripsWithOverspeeds = trips.filter(trip => trip.overspeedsCount > 0)
            expect(tripsWithOverspeeds.length).toBeGreaterThan(0)
        })

        it('should return trips sorted by start time in ascending order', async () => {
            const [trips, error] = await service.getTrips(10, 0)
            expect(error).toBeNull()
            for (let i = 1; i < trips.length; i++) {
                expect(trips[i].start.time).toBeGreaterThanOrEqual(trips[i - 1].start.time)
            }
        })
    })
})
