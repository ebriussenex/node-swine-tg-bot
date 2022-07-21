import dotenv from 'dotenv';

const CONFIG_PATH = `.${process.env.NODE_ENV}.env`;

console.log(`Using config file: ${CONFIG_PATH}`);

dotenv.config({ path: CONFIG_PATH });

export const config = Object.freeze({
    BOT_TOKEN: process.env.BOT_TOKEN as string,
    DB_USER: process.env.DB_USER as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_NAME: process.env.DB_NAME as string,
    DB_HOST: process.env.DB_HOST as string,
    DB_PORT: parseInt(process.env.DB_PORT as string),
    
    MAX_NAME_VALUE: 25,
    SWINE_FEED_TIMEOUT: 24,
    SWINE_DEFAULT_WEIGHT: 5,
    SWINE_WEIGHT_CHANGE_ABS: 20,
    SWINE_DEFAULT_NAME: 'Swin'
});