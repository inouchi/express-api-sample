import mysql, { PoolConnection } from "mysql";
import { promisify } from "util";
import config from "../../config/mysql";

const pool = mysql.createPool({
  host: config.HOST,
  port: config.PORT,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit: config.CONNECTION_LIMIT,
  queueLimit: config.QUEUE_LIMIT,
});

export default {
  getConnection: promisify(pool.getConnection).bind(pool),
  query: promisify(pool.query).bind(pool),
  releaseConnection: (connection: PoolConnection) => connection.release(),
  end: promisify(pool.end).bind(pool),
};
