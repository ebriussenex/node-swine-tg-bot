import * as zg from 'zapatos/generate';
import { dbConfig } from './config';

const zapCfg: zg.Config = {
  db: {
    user: dbConfig.DB_USER,
    host: dbConfig.DB_HOST,
    database: dbConfig.DB_NAME,
    password: dbConfig.DB_PASSWORD,
    port: dbConfig.DB_PORT,
  },
  outDir: './src/db',
};
export const configZapatos = async (): Promise<void> => await zg.generate(zapCfg);
