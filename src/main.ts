import { MongoRepository } from './adapters/secondary/mongo.repository'
import { TripsService } from './application/service'
import dotenv from 'dotenv'
import { OpenStreetMapGeocoding } from './adapters/secondary/openstreemap.geocoding'
import express from 'express'
import { WebController } from './adapters/primary/express'
import pino from 'pino'

dotenv.config()

let repository: MongoRepository

const logger = pino({
    level: process.env.LOG_LEVEL || 'info'
})

async function main() {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://root:password@mongo:27017'
        const dbName = process.env.MONGODB_DB_NAME || 'trips'

        // Inicializar el repositorio
        repository = new MongoRepository(logger, mongoUri, dbName)
        await repository.init()

        // Inicializar el servicio de geocodificación
        const geocodingService = new OpenStreetMapGeocoding(logger)

        // Inicializar el servicio de trips
        const tripsService = new TripsService(logger, repository, geocodingService)

        const app = express()
        app.use(express.json())

        const tripsController = new WebController(logger, tripsService)
        app.use('/api', tripsController.getRouter())

        const port = process.env.PORT || 3000
        app.listen(port, () => {
            logger.info(`Server running on port ${port}`)
        })

        logger.info('Aplicación inicializada correctamente')

    } catch (error) {
        logger.error('Error al inicializar la aplicación:', error)
        process.exit(1)
    }
}

main().catch((error) => {
    logger.error('Error no manejado:', error)
    process.exit(1)
})

// Manejo de cierre graceful
process.on('SIGINT', async () => {
    logger.info('Cerrando la aplicación...')
    repository.disconnect()
    process.exit(0)
})
