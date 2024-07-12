import { Trip, Result } from '../../domain/service.port'
import { Repository } from '../../domain/repository.port'
import { MongoClient, Db, Collection, ObjectId } from 'mongodb'
import { InsertError, NotFound } from '../../domain/errors'
import { Logger } from 'pino'
import { database, up } from 'migrate-mongo'

export type Address = {
    id: string
    lat: number
    lon: number
    address: string
}

export class MongoRepository implements Repository {
    private client: MongoClient
    private db: Db
    private tripsCollection: Collection<Trip>
    private addressesCollection: Collection<Address>
    private readonly logger: Logger

    constructor(logger: Logger, uri: string, dbName: string) {
        this.client = new MongoClient(uri)
        this.db = this.client.db(dbName)
        this.tripsCollection = this.db.collection<Trip>('trips')
        this.addressesCollection = this.db.collection<Address>('addresses')
        this.logger = logger.child({ classId: 'MongoRepository' });
    }

    async connect(): Promise<void> {
        await this.client.connect()
    }

    async disconnect(): Promise<void> {
        await this.client.close()
    }

    async init(): Promise<void> {
        try {
            this.logger.info('conectando a MongoDB')
            await this.connect()

            const { db, client: migrateClient } = await database.connect()
            const migrated = await up(db, migrateClient)
            if (migrated.length === 0) {
                this.logger.info('Sin migraciones pendientes')
                return
            }
            this.logger.info('Migraciones aplicadas: ', migrated)
        } catch (error) {
            this.logger.error('Error al inicializar la base de datos:', error.toString())
            await this.client.close()
            throw error
        }
    }

    async findTrips(limit = 10, offset = 0, startGte?: number, startLte?: number, distanceGte?: number): Promise<Result<Trip[]>> {
        try {
            const query: any = {}
            if (startGte !== undefined) query['start.time'] = { $gte: startGte }
            if (startLte !== undefined) query['start.time'] = { ...query['start.time'], $lte: startLte }
            if (distanceGte !== undefined) query.distance = { $gte: distanceGte }

            const trips = await this.tripsCollection.find(query)
                .skip(offset)
                .limit(limit)
                .toArray()

            return [trips, null]
        } catch (error) {
            return [[], error as Error]
        }
    }

    async insertTrip(trip: Trip): Promise<Result<string>> {
        try {
            const result = await this.tripsCollection.insertOne(trip)
            return [result.insertedId.toString(), null]
        } catch (error) {
            return ['', new InsertError('trip')]
        }
    }

    async insertAddress(lat: number, lon: number, address: string): Promise<Result<string>> {
        try {
            const newAddress: Address = {
                id: new ObjectId().toString(),
                lat,
                lon,
                address
            }
            const result = await this.addressesCollection.insertOne(newAddress)
            return [result.insertedId.toString(), null]
        } catch (error) {
            return ['', new InsertError('address')]
        }
    }

    async findAddress(lat: number, lon: number): Promise<Result<string>> {
        try {
            const address = await this.addressesCollection.findOne({ lat, lon })
            if (address) {
                return [address.address, null]
            } else {
                return ['', new NotFound('address')]
            }
        } catch (error) {
            return ['', error as Error]
        }
    }
}
