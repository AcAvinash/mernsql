import mysql, { PoolConfig } from "mysql"
import dotevn from "dotenv"
dotevn.config()

// createing connnection to the mysql database
const dbConnection = mysql.createConnection({
  connectionLimit: 12, // Adjust this value based on your requirements
  host: process.env.HOST || 'localhost',  // Fallback to localhost if not specified
  user: process.env.USER || 'root',
  password: process.env.PASSWORD || 'admin',
  database: process.env.NAME || 'labhkari',
  port: process.env.DATABASE_PORT || 3306,

  // port: process.env.DATABASE_PORT
} as PoolConfig);

export default dbConnection;