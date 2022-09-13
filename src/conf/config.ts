import dotenv from 'dotenv';

const CONFIG_PATH = `.${process.env.NODE_ENV as string}.env`;

console.log(`Using config file: ${CONFIG_PATH}`);

dotenv.config({ path: CONFIG_PATH });

export const botConfig = Object.freeze({
  BOT_TOKEN: process.env.BOT_TOKEN as string,
  SWINE_TOP_ROWS_DEFAULT: 50,
  MAX_NAME_LENGTH: 25,
  SWINE_FEED_TIMEOUT: 24,
  SWINE_FIGHT_TIMEOUT: 12,
  SWINE_DEFAULT_WEIGHT: 20,
  SWINE_WEIGHT_CHANGE_ABS: 22,
  SWINE_DEFAULT_NAME: 'Swin',
  MIN_FIGHT_WEIGHT: 5,
  FIGHT_RES_DELAY_MS: 1500,
  MAX_FIGHT_WEIGHT_CHANGE: 120,
  MAX_PART_EATEN: 0.4,
  WEIGHTCHANGE_BALANCE: [
    [10, 1],
    [20, 0.9],
    [50, 0.8],
    [80, 0.75],
    [110, 0.7],
    [160, 0.65],
    [230, 0.6],
    [320, 0.55],
  ] as [number, number][],
  DRAW_CHANCE: 0.2,
  TIME_BEFORE_WEIGHT_LOSE: 24,
  TIME_BEFORE_DEATH: 72,
  MIN_WEIGHT_LOSS: 11,
  MINUTES_BEFORE_CLEAN: 15,
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
