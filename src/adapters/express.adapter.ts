// import http from 'http'
// import { Service } from '../domain/service'
// import { ValidationError, NotFound, ExceededAmountError } from '../domain/errors'

// export class WebAdapter {
    // private server: http.Server

    // constructor(private service: Service) {
        // this.server = http.createServer(this.handleRequest.bind(this))
    // }

    // private async handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
        // const url = new URL(req.url!, `http://${req.headers.host}`)
        // const path = url.pathname
        // const method = req.method!

        // try {
            // if (path === '/transfer' && method === 'POST') {
                // await this.handleTransfer(req, res)
            // } else if (path === '/account' && method === 'POST') {
                // await this.handleCreateAccount(req, res)
            // } else if (path.startsWith('/balance/') && method === 'GET') {
                // await this.handleGetBalance(req, res)
            // } else if (path.startsWith('/history/') && method === 'GET') {
                // await this.handleGetTransferHistory(req, res)
            // } else {
                // this.sendResponse(res, 404, { error: 'Not Found' })
            // }
        // } catch (error) {
            // console.error('Error handling request:', error)
            // this.sendResponse(res, 500, { error: 'Internal Server Error' })
        // }
    // }

    // private async handleTransfer(req: http.IncomingMessage, res: http.ServerResponse) {
        // const body = await this.getRequestBody(req)
        // const { amount, fromId, toId } = JSON.parse(body)
        // const [id, error] = await this.service.transfer(amount, fromId, toId)
        // if (error) {
            // this.handleError(res, error)
        // } else {
            // this.sendResponse(res, 200, { id })
        // }
    // }

    // private async handleCreateAccount(req: http.IncomingMessage, res: http.ServerResponse) {
        // const body = await this.getRequestBody(req)
        // const { userId, amount } = JSON.parse(body)
        // const [id, error] = await this.service.newBankAccount(userId, amount)
        // if (error) {
            // this.handleError(res, error)
        // } else {
            // this.sendResponse(res, 201, { id })
        // }
    // }

    // private async handleGetBalance(req: http.IncomingMessage, res: http.ServerResponse) {
        // const accountId = parseInt(req.url!.split('/').pop()!)
        // const [balance, error] = await this.service.getBalance(accountId)
        // if (error) {
            // this.handleError(res, error)
        // } else {
            // this.sendResponse(res, 200, { balance })
        // }
    // }

    // private async handleGetTransferHistory(req: http.IncomingMessage, res: http.ServerResponse) {
        // const accountId = parseInt(req.url!.split('/').pop()!)
        // const [transfers, error] = await this.service.getTransferHistory(accountId)
        // if (error) {
            // this.handleError(res, error)
        // } else {
            // this.sendResponse(res, 200, { transfers })
        // }
    // }

    // private handleError(res: http.ServerResponse, error: Error) {
        // if (error instanceof ValidationError) {
            // this.sendResponse(res, 400, { error: error.message })
        // } else if (error instanceof NotFound) {
            // this.sendResponse(res, 404, { error: error.message })
        // } else if (error instanceof ExceededAmountError) {
            // this.sendResponse(res, 400, { error: error.message })
        // } else {
            // this.sendResponse(res, 500, { error: 'Internal Server Error' })
        // }
    // }

    // private sendResponse(res: http.ServerResponse, statusCode: number, body: object) {
        // res.writeHead(statusCode, { 'Content-Type': 'application/json' })
        // res.end(JSON.stringify(body))
    // }

    // private getRequestBody(req: http.IncomingMessage): Promise<string> {
        // return new Promise((resolve, reject) => {
            // let body = ''
            // req.on('data', chunk => {
                // body += chunk.toString()
            // })
            // req.on('end', () => {
                // resolve(body)
            // })
            // req.on('error', reject)
        // })
    // }

    // public start(port: number) {
        // this.server.listen(port, () => {
            // console.log(`Server running on http://localhost:${port}`)
        // })
    // }

    // public stop() {
        // this.server.close()
    // }
// }
