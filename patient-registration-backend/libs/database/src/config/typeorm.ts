import { registerAs } from "@nestjs/config"
import { DataSource, DataSourceOptions } from "typeorm"
import { config as dotenvConfig } from "dotenv"
import { Patient } from "../entities/patient.entity"
dotenvConfig({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env",
})

const config = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Patient],
  synchronize: true,
}



export default registerAs("typeorm", () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)