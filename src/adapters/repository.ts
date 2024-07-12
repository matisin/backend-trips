// import { Pool, PoolClient } from 'pg'
// import { NotFound, InsertError, ExceededAmountError } from '../domain/errors'
// import { Repository } from '../domain/repository'
// import { Result, Transfer } from '../domain/service'

// export class PostgresRepository implements Repository {
    // private pool: Pool

    // constructor(connectionString: string) {
        // this.pool = new Pool({
            // connectionString,
        // })
    // }

    // async newTransfer(amount: number, fromId: number, toId: number): Promise<Result<number>> {
        // const client = await this.pool.connect()
        // try {
            // await client.query('BEGIN')

            // const fromResult = await client.query(
                // 'UPDATE accounts SET balance = balance - $1 WHERE id = $2 RETURNING balance',
                // [amount, fromId]
            // )
            // if (fromResult.rows.length === 0) {
                // throw new NotFound('from account')
            // }
            // if (fromResult.rows[0].balance < 0) {
                // throw new ExceededAmountError(fromId, amount)
            // }

            // const toResult = await client.query(
                // 'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
                // [amount, toId]
            // )
            // if (toResult.rowCount === 0) {
                // throw new NotFound('to account')
            // }

            // const transferResult = await client.query(
                // 'INSERT INTO transfers (from_id, to_id, amount, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
                // [fromId, toId, amount]
            // )

            // await client.query('COMMIT')
            // return [transferResult.rows[0].id, null]
        // } catch (error) {
            // await client.query('ROLLBACK')
            // if (error instanceof NotFound || error instanceof ExceededAmountError) {
                // return [0, error]
            // }
            // return [0, new InsertError('transfer')]
        // } finally {
            // client.release()
        // }
    // }

    // async createBankAccount(amount: number, userId: number): Promise<Result<number>> {
        // try {
            // const result = await this.pool.query(
                // 'INSERT INTO accounts (user_id, balance) VALUES ($1, $2) RETURNING id',
                // [userId, amount]
            // )
            // return [result.rows[0].id, null]
        // } catch (error) {
            // return [0, new InsertError('account')]
        // }
    // }
    // async findBalance(accountId: number): Promise<Result<number>> {
        // const result = await this.pool.query(
            // 'SELECT balance FROM accounts WHERE id = $1',
            // [accountId]
        // )
        // if (result.rows.length === 0) {
            // return [0, new NotFound('account')]
        // }
        // return [result.rows[0].balance, null]
    // }

    // async findTransfersByAccount(accountId: number, order: string): Promise<Result<Transfer[]>> {
        // const result = await this.pool.query(
            // `SELECT * FROM transfers 
             // WHERE from_id = $1 OR to_id = $1 
             // ORDER BY created_at ${order === 'DESC' ? 'DESC' : 'ASC'}`,
            // [accountId]
        // )
        // const transfers: Transfer[] = result.rows.map(row => (
            // {
                // fromId: row.from_id,
                // toId: row.to_id,
                // amount: row.amount,
                // createdAt: row.created_at
            // }
        // ))
        // return [transfers, null]
    // }

    // async findUserName(userId: number): Promise<Result<string>> {
        // const result = await this.pool.query(
            // 'SELECT name FROM users WHERE id = $1',
            // [userId]
        // )
        // if (result.rows.length === 0) {
            // return ["", new NotFound('user')]
        // }
        // return [result.rows[0].name, null]
    // }
// }
