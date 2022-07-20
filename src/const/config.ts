import dotenv from 'dotenv';

dotenv.config();

const botToken: string = (process.env.NODE_ENV === 'development') ? process.env.DEV_BOT_TOKEN as string : process.env.BOT_TOKEN as string;

export const config = {
    botToken: botToken
};