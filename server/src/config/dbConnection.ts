import mysql, { PoolConfig } from "mysql"
import dotevn from "dotenv"
dotevn.config()

// createing connnection to the mysql database
const dbConnection = mysql.createConnection({
  connectionLimit: 12, // Adjust this value based on your requirements
  host: process.env.HOST ,  // Fallback to localhost if not specified
  user: process.env.USER ,
  password: process.env.PASSWORD,
  database: process.env.NAME ,
  port: process.env.DATABASE_PORT,

  // port: process.env.DATABASE_PORT
} as PoolConfig);

export default dbConnection;