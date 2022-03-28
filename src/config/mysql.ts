export default {
  HOST: process.env.MYSQL_HOST || "127.0.0.1",
  PORT: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
  USER: process.env.MYSQL_USER || "root",
  PASSWORD: process.env.MYSQL_PASSWORD || "example",
  DATABASE: process.env.MYSQL_DATABASE || "db_sample",
};
