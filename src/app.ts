import { Telegraf } from "telegraf";
import { botConfig } from "./const/config";
import { connection } from "./repository";

console.log(`Your tg bot token is ${botConfig.BOT_TOKEN}`);

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    if (botConfig.BOT_TOKEN === undefined) {
      throw new Error(
        "Bot token is not present in .env file or in env variable"
      );
    }
    const bot = new Telegraf(botConfig.BOT_TOKEN);
    bot.command("hipster", Telegraf.reply("λ"));
    bot.launch();

    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
