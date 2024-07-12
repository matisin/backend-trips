import { Trip, Result } from '../domain/service.port'
import { Repository } from '../domain/repository.port'
import { ObjectId } from 'bson'
import { NotFound } from '../domain/errors'

export type Address = {
    id: string
    lat: number
    lon: number
    address: string
}

export class MockRepository implements Repository {
    private readonly initTrips: Trip[]
    private readonly initAddresses: Address[]

    public trips: Trip[]
    public addresses: Address[]

    findTrips: (limit: number, offset: number, startGte?: number, startLte?: number, distanceGte?: number)
        => Promise<Result<Trip[]>>
    insertTrip: (trip: Trip) => Promise<Result<string>>

    insertAddress: (lat: number, lon: number, address: string) => Promise<Result<string>>

    findAddress: (lat: number, lon: number) => Promise<Result<string>>

    constructor(trips: Trip[], addresses: Address[]) {
        this.initTrips = trips
        this.initAddresses = addresses

        this.findTrips = jest.fn(this.findTripsMock)
        this.insertTrip = jest.fn(this.insertTripMock)
        this.insertAddress = jest.fn(this.insertAddresMock)
        this.findAddress = jest.fn(this.findAddressMock)
    }

    clearData(): void {
        this.trips = structuredClone(this.initTrips)
        this.addresses = structuredClone(this.initAddresses)
    }

    async insertAddresMock(lat: number, lon: number, address: string): Promise<Result<string>> {
        let newAddress: Address = {
            id: new ObjectId().toString(),
            lat,
            lon,
            address
        }
        this.addresses.push(newAddress)
        return [newAddress.id, null]
    }

    async findAddressMock(lat: number, lon: number): Promise<Result<string>> {
        for (let address of this.addresses) {
            if (lat === address.lat && lon === address.lon) {
                return [address.address, null]
            }
        }
        return ["", new NotFound('address')]
    }

    async findTripsMock(limit = 10, offset = 0, startGte?: number, startLte?: number, distanceGte?: number)
        : Promise<Result<Trip[]>> {
        let response = this.trips.filter(trip =>
            (startGte === undefined || trip.start.time >= startGte) &&
            (startLte === undefined || trip.start.time <= startLte) &&
            (distanceGte === undefined || trip.distance >= distanceGte)
        )

        response = response.slice(offset, offset + limit)
        return [response, null]
    }

    async insertTripMock(trip: Trip): Promise<Result<string>> {
        trip.id = new ObjectId().toString()
        console.log(trip)
        this.trips.push(trip)
        return [trip.id, null]
    }
}
