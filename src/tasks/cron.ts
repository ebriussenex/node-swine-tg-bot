import _ from 'lodash';
import * as cron from 'node-cron';
import { Context, Telegraf } from 'telegraf';
import { messages, SwinesOwners, SwinesOwnersLW } from '../const/messages';
import { swineRepository, SwinesJoinOneTgUser } from '../repository/swine.repository';
import { swineService } from '../service/swine.service';

export const scheduleTasks = (bot: Telegraf<Context>): void => {
  cron.schedule(
    '0/1 * * * * *',
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async () => {
      const uniqKeys: string[] = [];
      console.log('Mark to delete task started');
      const [lossWeight, toKill]: [
        Record<string, [SwinesJoinOneTgUser, number][]>,
        Record<string, SwinesJoinOneTgUser[]>,
      ] = await swineService.findNotFed();
      if (Object.keys(lossWeight).length > 0) {
        Object.keys(lossWeight).forEach(e => uniqKeys.push(e));
      }
      if (Object.keys(toKill).length > 0) {
        Object.keys(toKill).forEach(e => uniqKeys.push(e));
      }
      for (const chatId of uniqKeys) {
        let msg = '';
        if (lossWeight.hasOwnProperty(chatId)) {
          if (lossWeight[chatId].length > 1) {
            msg += messages.SWINES_NOT_FED_LW(lossWeight[chatId].map(lw => swineOwnersLwFromSwine(lw)));
          } else if (lossWeight[chatId].length === 1) {
            msg += messages.SWINE_NOT_FED_LW_MSG(swineOwnersLwFromSwine(lossWeight[chatId][0]));
          }
        }
        if (toKill.hasOwnProperty(chatId)) {
          if (toKill[chatId].length > 1) {
            msg += messages.SWINES_ABOUT_TO_DIE(toKill[chatId].map(tk => swineOwnersFromSwine(tk)));
          } else if (toKill[chatId].length === 1) {
            msg += messages.SWINE_ABOUT_TO_DIE(swineOwnersFromSwine(toKill[chatId][0]));
          }
        }
        console.log(
          `Sent to chat ${chatId} to kill ${toKill.hasOwnProperty(chatId) ? toKill[chatId].length : 0} swines` +
            `\nTo feed ${lossWeight.hasOwnProperty(chatId) ? lossWeight[chatId].length : 0} swines`,
        );
        try {
          await bot.telegram.sendMessage(parseInt(chatId), msg, { parse_mode: 'MarkdownV2' });
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(`Error during sending message in task ${err.message}`);
          }
        }
      }
    },
  );
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  cron.schedule('45 * * * * *', async () => {
    const swines = await swineRepository.deleteDead();
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
