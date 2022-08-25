import _ from 'lodash';
import * as cron from 'node-cron';
import { Context, Telegraf } from 'telegraf';
import { botConfig } from '../conf/config';
import { messages, SwinesOwners, SwinesOwnersLW } from '../const/messages';
import { SwinesJoinOneTgUser } from '../repository/swine.repository';
import { swineService } from '../service/swine.service';

export const scheduleTask = (bot: Telegraf<Context>): void => {
  cron.schedule(
    '45 * * * * *',
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async () => {
      console.log('sched');
      const [lossWeight, toKill]: [
        Record<string, [SwinesJoinOneTgUser, number][]>,
        Record<string, SwinesJoinOneTgUser[]>,
      ] = await swineService.findNotFed();
      for (const chatId of _.uniq(Object.keys(lossWeight).concat(Object.keys(toKill)))) {
        let msg = '';
        if (lossWeight[chatId].length > 1) {
          msg += messages.SWINES_NOT_FED_LW(lossWeight[chatId].map(lw => swineOwnersLwFromSwine(lw)));
        } else if (lossWeight[chatId].length === 1) {
          msg += messages.SWINE_NOT_FED_LW_MSG(swineOwnersLwFromSwine(lossWeight[chatId][0]));
        }
        if (toKill[chatId].length > 1) {
          msg += messages.SWINES_ABOUT_TO_DIE(toKill[chatId].map(tk => swineOwnersFromSwine(tk)));
        } else if (toKill[chatId].length === 1) {
          msg += messages.SWINE_ABOUT_TO_DIE(swineOwnersFromSwine(toKill[chatId][0]));
        }
        if (msg !== '') {
          await bot.telegram.sendMessage(parseInt(chatId), msg, { parse_mode: 'MarkdownV2' });
        }
      }
    },
  );
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  cron.schedule('45 * * * * *', async () => {
    await bot.telegram.sendMessage(-715518225, 'CHECK1', { parse_mode: 'MarkdownV2' });
    const [lossWeight, toKill]: [
      Record<string, [SwinesJoinOneTgUser, number][]>,
      Record<string, SwinesJoinOneTgUser[]>,
    ] = await swineService.findNotFed();
    await bot.telegram.sendMessage(
      -715518225,
      `Aquired swines: ` + `${swineOwnersLwFromSwine(lossWeight[-715518225][0]).toString()}`,
      { parse_mode: 'MarkdownV2' },
    );
  });
};

const swineOwnersLwFromSwine = (swine: [SwinesJoinOneTgUser, number]): SwinesOwnersLW => ({
  userId: swine[0].owner_id,
  username: swine[0].tg_user.first_name,
  name: swine[0].name,
  wc: swine[1],
  weight: swine[0].weight,
});

const swineOwnersFromSwine = (swine: SwinesJoinOneTgUser): SwinesOwners => ({
  userId: swine.owner_id,
  username: swine.tg_user.first_name,
  name: swine.name,
});
