import { PoolConnection, QueryOptions } from "mysql";
import pool from "./pool";

class Transaction {
  private connection!: PoolConnection | null;

  constructor(connection?: PoolConnection) {
    this.connection = connection ?? null;
  }

  async begin() {
    if (this.connection) {
      this.connection.release();
    }
    this.connection = await pool.getConnection();
    this.connection.beginTransaction();
  }

  async query(query: string | QueryOptions, options = { fields: false }) {
    return new Promise((resolve, reject) => {
      this.connection?.query(query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(options.fields ? { results, fields } : results);
        }
      });
    });
  }

  async commit() {
    return new Promise<void>((resolve, reject) => {
      this.connection?.commit((err) => {
        this.connection?.release();
        this.connection = null;
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async rollback() {
    return new Promise<void>((resolve, reject) => {
      this.connection?.rollback((err) => {
        this.connection?.release();
        this.connection = null;
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default Transaction;
