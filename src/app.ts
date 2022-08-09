import express from 'express';
import {Telegraf} from 'telegraf';
import {botConfig} from './conf/config';
import {getTunnel} from './scripts/localtunnel';
import dotenv from 'dotenv';
import {configZapatos} from './conf/zapatos.config';
import {addSwineHandlers} from './bot/swine.handlers';

console.log(`Your tg bot token is ${botConfig.BOT_TOKEN}`);

const start = async (): Promise<void> => {
  const CONFIG_PATH = `.${process.env.NODE_ENV as string}.env`;
  dotenv.config({path: CONFIG_PATH});

  console.log(`Using env: ${process.env.NODE_ENV as string}`);

  try {
    if (botConfig.BOT_TOKEN === undefined) {
      throw new Error(
          'Bot token is not present in .env file or in env variable',
      );
    }

    await configZapatos();

    let bot = new Telegraf(botConfig.BOT_TOKEN);

    let url = `${process.env.HOST as string}`;
    if (process.env.NODE_ENV === 'dev') {
      url = await getTunnel();
    }
    const secretPath = `/telegraf/${bot.secretPathComponent()}`;

    console.log('Current webhook, will be deleted:');
    console.log(await bot.telegram.getWebhookInfo());

    await bot.telegram.deleteWebhook();
    await bot.telegram.setWebhook(`${url}${secretPath}`);

    console.log('New webhook:');
    console.log(await bot.telegram.getWebhookInfo());

    const app = express();
    app.use(bot.webhookCallback(secretPath));

    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT as string}!`);
    });

    bot = addSwineHandlers(bot);
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
