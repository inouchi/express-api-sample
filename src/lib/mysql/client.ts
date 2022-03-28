import { QueryOptions } from "mysql";
import pool from "./pool";

const MySQLClient = {
  query: async (query: string | QueryOptions) => await pool.query(query),
};

export default MySQLClient;
