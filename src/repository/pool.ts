import pg from 'pg';
import {dbConfig} from '../conf/config';

export const pool = new pg.Pool({
  host: dbConfig.DB_HOST,
  port: dbConfig.DB_PORT,
  user: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME,
});
pool.on('error', console.error);
