import express, { Request, Response } from 'express'
import { Logger } from 'pino'
import { Service, Reading } from '../../domain/service.port'

export class WebController {
    private router: express.Router
    private logger: Logger

    constructor(logger: Logger, private tripsService: Service) {
        this.logger = logger.child({ classId: 'WebController' })
        this.router = express.Router()
        this.setupRoutes()
    }

    private setupRoutes() {
        this.router.get('/trips', this.getTrips.bind(this))
        this.router.post('/trips', this.createTrip.bind(this))
    }

    private async getTrips(req: Request, res: Response) {
        const limit = parseInt(req.query.limit as string) || 10
        const offset = parseInt(req.query.offset as string) || 0
        const startGte = req.query.start_gte ? parseInt(req.query.start_gte as string) : undefined
        const startLte = req.query.start_lte ? parseInt(req.query.start_lte as string) : undefined
        const distanceGte = req.query.distance_gte ? parseFloat(req.query.distance_gte as string) : undefined

        try {
            const [trips, error] = await this.tripsService.getTrips(limit, offset, startGte, startLte, distanceGte)
            if (error) {
                this.logger.error('Error getting trips:', error)
                return res.status(400).json({ error: error.message })
            }
            res.json(trips)
        } catch (error) {
            this.logger.error('Unexpected error getting trips:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    private async createTrip(req: Request, res: Response) {
        const readings: Reading[] = req.body.readings;

        if (!Array.isArray(readings) || readings.length === 0) {
            return res.status(400).json({ error: 'Invalid readings data' });
        }

        try {
            const [tripId, error] = await this.tripsService.newTrip(readings);
            if (error) {
                this.logger.error('Error creating trip:', error);
                return res.status(400).json({ error: error.message });
            }
            res.status(201).json({ id: tripId });
        } catch (error) {
            this.logger.error('Unexpected error creating trip:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public getRouter() {
        return this.router;
    }
}
