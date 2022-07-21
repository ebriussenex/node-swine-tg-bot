import { dotenv } from 'dotenv';

dotenv.config();

export const config = Object.freeze({
    BOT_TOKEN: () => (process.env.NODE_ENV === 'development') ?
        process.env.DEV_BOT_TOKEN as string :
        process.env.BOT_TOKEN as string,
    MAX_NAME_VALUE: 25,
    SWINE_FEED_TIMEOUT: 24,
    SWINE_DEFAULT_WEIGHT: 5,
    SWINE_WEIGHT_CHANGE_ABS: 20,
    SWINE_DEFAULT_NAME: 'Swin'
});