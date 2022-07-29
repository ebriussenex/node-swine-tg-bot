import { dbConfig } from "../const/config";
import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";

export const connection = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.DB_DIALECT as Dialect,
    pool: {
      max: dbConfig.DB_POOL.MAX,
      min: dbConfig.DB_POOL.MIN,
      acquire: dbConfig.DB_POOL.ACQ,
      idle: dbConfig.DB_POOL.IDLE,
    },
    models: [__dirname + '/**/*.model.ts'],
  }
);
