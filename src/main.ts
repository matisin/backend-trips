import { WebAdapter } from './adapters/web'
import { BankingService } from './banking.service'
import { PostgresRepository } from './adapters/repository'

// el conection string deberia obtenerse por variable de entorno
const repository = new PostgresRepository('postgres://banking:password@db:5432/banking?sslmode=disable')
const service = new BankingService(repository)
const webAdapter = new WebAdapter(service)

webAdapter.start(3000)
