import { QueryOptions } from "mysql";
import pool from "./pool";
import Transaction from "./transaction";

const MySQLClient = {
  query: async (query: string | QueryOptions) => await pool.query(query),
  beginTransaction: async () => {
    const transaction = new Transaction();
    await transaction.begin();
    return transaction;
  },
};

export default MySQLClient;
