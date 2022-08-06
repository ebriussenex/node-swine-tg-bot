import dotenv from 'dotenv';

const CONFIG_PATH = `.${process.env.NODE_ENV as string}.env`;

console.log(`Using config file: ${CONFIG_PATH}`);

dotenv.config({path: CONFIG_PATH});

export const botConfig = Object.freeze({
  BOT_TOKEN: process.env.BOT_TOKEN as string,
  SWINE_TOP_ROWS_DEFAULT: 50,
  MAX_NAME_LENGTH: 25,
  SWINE_FEED_TIMEOUT: 24,
  SWINE_DEFAULT_WEIGHT: 5,
  SWINE_WEIGHT_CHANGE_ABS: 20,
  SWINE_DEFAULT_NAME: 'Swin',
  WEBHOOK_HOST: '<ip/host where the bot is running>',
  WEBHOOK_PORT: 8443, // 443, 80, 88 or 8443 (port need to be 'open'),
  WEBHOOK_LISTEN: '0.0.0.0',
  WEBHOOK_SSL_CERT: './webhook_cert.pem',
  WEBHOOK_SSL_PRIV: './webhook_pkey.pem',
  API_TOKEN: '',
});

export const dbConfig = Object.freeze({
  DB_USER: process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_NAME: process.env.DB_NAME as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_PORT: parseInt(process.env.DB_PORT as string, 10),
  DB_DIALECT: process.env.DB_DIALECT,
  DB_POOL: {
    MAX: parseInt(process.env.DB_POOL_MAX as string, 10),
    MIN: parseInt(process.env.DB_POOL_MIN as string, 10),
    ACQ: parseInt(process.env.DB_POOL_ACQUIRE as string, 10),
    IDLE: parseInt(process.env.DB_POOL_IDLE as string, 10),
  },
});
