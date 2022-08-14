import {botConfig} from '../conf/config';
import {FightStatisctics} from '../service/swine.service';
import {commands, forbiddenSymbols} from './commands';


export const messages = Object.freeze({
  NOT_ENOUGH_WEIGHT_TO_FIGHT_MSG: (username: string, userId:string, weight: number, swineName: string) =>
    `[${username}](tg://user?id=${userId}) Ваш ${swineName} 🐖 слишком маленький, ` +
     `чтобы учавствовать в драках, всего *${weight} кг*. Пусть немного подрастет.\n` +
     `Необходимая масса для участия: *${botConfig.MIN_FIGHT_WEIGHT} кг.*`,
  FIGHT_TIMEOUT_MSG: (username: string, userId: string, h: number, m: number) =>
    `[${username}](tg://user?id=${userId}) Ваш боров уже дрался за `+
   `последние *${botConfig.SWINE_FIGHT_TIMEOUT} ч.*\n` + messages.NEXT_FIGHT_TIME_MSG([h, m]),
  DRAW_MSG: (name: string, weight: number): string =>
    `Боец в правом углу: 🐷 *${name}, ${weight} кг.*\n *Ничья*, оба свина сражались достойно!💪`,
  FIGHT_RES_MSG: (name: string, weight: number, wName: string, lName: string, weightChange: number): string =>
    `Боец в правом углу: 🐷 *${name}, ${weight} кг.*\n` +
    `Поросенок *${wName}* не сотавил шанса свину *${lName}*. Отгрыз от него *${weightChange} кг*. сала! ` +
      'Поздравляем победителя!👏',
  FIGHT_START_MSG: (username: string, userId:string, name: string, weight: number) =>
    `[${username}](tg://user?id=${userId}) вызывает на поединок! Боец в левом углу: 🐷 *${name}, ${weight} кг.*`,
  ACCEPT_FIGHT_MSG: (username: string, userId:string) =>
    `[${username}](tg://user?id=${userId}) принял вызов!`,
  NO_SUCH_COMMAND: (command: string): string =>
    `Нет информации о команде *${command}*`,
  BOT_DESCRIPTION_MSG: 'Телеграм-бот *swinebot*. Позволяет выращивать ' +
      'свиней в ' +
      `телеграм-чате. Для описания команд, напишите */${commands.HELP}*`,
  FORBIDDEN_NAME_CHAR_MSG: (char: string): string =>
    `Имя содержит один из запрещенных символов : *${char}* запрещены: ` +
      `\`\`\`${forbiddenSymbols.join(' ,')}\`\`\``,
  COMMAND_INFORMATION: `*/${commands.HELP} <command_name>* - помощь по команде`,
  SPECIFY_NAME: 'Имя швайнокарася не может быть пустым',
  TOO_LARGE_NAME_MSG:
      `Имя слишком большое! Максимальный размер: *${botConfig.MAX_NAME_LENGTH}*`,
  SWINE_CREATION_MSG: (name: string): string =>
    `Ого у вас родился свин 🐖! Его зовут: *${name}*,` +
      ` *${botConfig.SWINE_DEFAULT_WEIGHT} кг.*`,
  SWINE_WEIGHT_MSG: (weight: string): string =>
    `Вес вашего поросенка 🐷: *${weight} кг.*`,
  SWINE_RENAME_MSG: (name: string): string =>
    `Теперь вашего 🐷 свина зовут: *${name}*`,
  SWINE_WEIGHT_CHANGE_MSG: (
      name: string,
      weightChange: number,
      weight: number,
      username: string,
      userId: string,
  ): string => {
    return (
      `[${username}](tg://user?id=${userId}), Вы покормили вашего свина. Ваш 🐖 *${name}* ` +
        `${weightChange > 0 ? messages.GAIN : messages.LOSS}` +
        ` на *${Math.abs(weightChange)} кг* сала. Теперь он весит *${weight} кг*`
    );
  },
  SWINE_FEED_TIMEOUT_MSG: (h: number, min: number): string =>
    'Вы уже кормили своего 🐽 хряка за последние ' +
      `*${botConfig.SWINE_FEED_TIMEOUT} ч.*\n` + messages.NEXT_FEED_TIME_MSG([h, min]),
  WRONG_COMMAND_MESSAGE:
      'Неизвестная команда, используйте комманду ' +
      `/${commands.HELP} для списка комманд.`,
  SWINE_NOT_EXISTS_MSG: (username: string, userId:string):string =>
    `[${username}](tg://user?id=${userId}), У вас еще нет хряка! Напишите /${commands.NAME} ` +
      `или /${commands.FEED}, чтобы он родился.`,
  ACCEPTED_INVALID_FIGHT_MSG: 'Вы не можете принять вызов. Бой уже состоялся',
  ACCEPTED_INVALID_FIGHT_SESS_MSG: 'Сессия устарела, вы не можете принять бой',
  SELF_FIGHT_MSG: 'Вы не можете принять вызов от самого себя',
  LOSS: 'похудел',
  GAIN: 'поправился',
  TOP_MSG: (chatName: string): string =>
    `🐷Топ швайнокарасей беседы *${chatName}*🐷: \n`,
  TOP_ROW_MSG: (pos: number, name: string, weight: number): string =>
    `*${pos}*. ${name} - *${weight} кг*\n`,
  TOP_ROW_OWNERS_MSG: (pos: number, name: string, weight: number, userFirstName: string): string =>
    `*${pos}*. ${name} - *${weight} кг*, - *${userFirstName}*\n`,
  SWINE_DELETE_MSG: 'Ваш поросенок был убит. Помянем',
  SWINE_INFO_MSG: (
      name: string,
      weight: number,
      hm: [number, number],
      fhm: [number, number],
      fightStats: FightStatisctics,

  ): string =>
    `Швайнокарась 🐽 *${name}*, *${weight}* кг.\n` +
    messages.NEXT_FEED_TIME_MSG(hm) +
    messages.NEXT_FIGHT_TIME_MSG(fhm) +
    messages.FIGHT_STAT_MSG(fightStats),
  CHANNEL_IS_NOT_ALLOWED_MSG: 'Бот не предназначен для каналов, всем пока',
  NEXT_FIGHT_TIME_MSG: (hm: [number, number]): string =>
    `Следующая битва доступна через *${hm[0]} ч. ${hm[1]} мин.*\n`,
  NEXT_FEED_TIME_MSG: (hm: [number, number]): string =>
    `До следующей покормки *${hm[0]} ч. ${hm[1]} мин*.\n`,
  FIGHT_STAT_MSG: (fightStats: FightStatisctics): string =>
    `Свин поучавствовал в *${fightStats.win + fightStats.loss + fightStats.draw}* сражениях.\n` +
    `Из которых выиграл: *${fightStats.win}*, проиграл: *${fightStats.loss}*\n`,
});
