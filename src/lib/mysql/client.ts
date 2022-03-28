import mysql from "mysql";
import { promisify } from "util";
import config from "../../config/mysql";

const connection = mysql.createConnection({
  host: config.HOST,
  port: config.PORT,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
});

const MySQLClient = {
  connect: promisify(connection.connect).bind(connection),
  query: promisify(connection.query).bind(connection),
  end: promisify(connection.end).bind(connection),
};

export default MySQLClient;
