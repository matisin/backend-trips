import { Result } from '../../domain/service.port'
import { AddressNotFound } from '../../domain/errors'
import { Geocoding } from '../../domain/geocoding.port'

type GeocodingObj = {
    lat: number
    lon: number
    address: string
}

export class MockGeocoding implements Geocoding {
    private readonly initGeocodings: GeocodingObj[]

    getAddress: (lat: number, lon: number) => Promise<Result<string>>

    constructor(geocodings: GeocodingObj[]) {
        this.initGeocodings = geocodings
        this.getAddress = jest.fn(this.getAddressMock)
    }

    async getAddressMock(lat: number, lon: number): Promise<Result<string>> {
        for (let geocoding of this.initGeocodings) {
            if (geocoding.lon === lon && geocoding.lat === lat) {
                return [geocoding.address, null]
            }
        }
        return ['', new AddressNotFound(lat, lon)]
    }
}
