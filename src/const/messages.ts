import { botConfig } from '../conf/config';
import { FightStatisctics } from '../service/swine.service';
import { commands } from './commands';

const usrMentionMdV2 = (username: string, userId: string): string =>
  `[${escapeMdV2(username)}](tg://user?id=${userId})`;

export const escapeMdV2 = (s = ''): string => s.replace(/[_*[\]()~`>#+-=|{}.!]/gi, '\\$&');

const SYNONIMS: Record<string, string[]> = {
  swine: ['свин', 'поросенок', 'минипиг', 'боров', 'швайнокарась', 'хряк'],
  swine_genetive: ['свина', 'поросенка', 'минипига', 'борова', 'швайнокарася'],
  swines: ['свиньи', 'поросята', 'минипиги', 'боровы', 'швайнокараси'],
};

export const messages = Object.freeze({
  NOT_ENOUGH_WEIGHT_TO_FIGHT_MSG: (username: string, userId: string, weight: number, swineName: string) =>
    usrMentionMdV2(username, userId) +
    `, Ваш ${escapeMdV2(swineName)} 🐖 слишком маленький, ` +
    `чтобы учавствовать в драках, всего *${weight} кг*\\. Покормите, чтобы он подрос */feed*\\.\n` +
    `Необходимая масса для участия: *${botConfig.MIN_FIGHT_WEIGHT} кг\\.*`,

  FIGHT_TIMEOUT_MSG: (username: string, userId: string, h: number, m: number): string =>
    usrMentionMdV2(username, userId) +
    `, Ваш боров уже дрался за ` +
    `последние *${botConfig.SWINE_FIGHT_TIMEOUT} ч\\.*\n` +
    messages.NEXT_FIGHT_TIME_MSG([h, m]),
  FIGHTER_MSG: (username: string, userId: string, name: string, weight: number): string =>
    usrMentionMdV2(username, userId) + `, Боец в правом углу: 🐷 *${escapeMdV2(name)}, ${weight} кг\\.*`,
  DRAW_MSG: (username: string, userId: string, name: string, weight: number): string =>
    messages.FIGHTER_MSG(username, userId, name, weight) + `\n *Ничья*, оба свина сражались достойно\\!💪`,
  FIGHT_RES_MSG: (
    username: string,
    userId: string,
    name: string,
    weight: number,
    wName: string,
    lName: string,
    weightChange: number,
  ): string =>
    messages.FIGHTER_MSG(username, userId, name, weight) +
    `\nПоросенок *${escapeMdV2(wName)}* не оставил шанса свину *${escapeMdV2(lName)}*\\. ` +
    `Отгрыз от него *${weightChange} кг*\\. сала\\! ` +
    'Поздравляем победителя\\!👏',
  FIGHT_START_MSG: (username: string, userId: string, name: string, weight: number) =>
    usrMentionMdV2(username, userId) +
    ` вызывает на поединок\\! Боец в левом углу: 🐷 *${escapeMdV2(name)}, ${weight} кг\\.*`,
  ACCEPT_FIGHT_MSG: (username: string, userId: string) => usrMentionMdV2(username, userId) + ` принял вызов\\!`,
  NO_SUCH_COMMAND: (command: string): string => `Нет информации о команде *${command}*`,
  BOT_DESCRIPTION_MSG: 'Телеграм\\-бот *swinebot*\\. Позволяет выращивать ' + 'свиней в ' + `телеграм\\-чате\\.`,
  COMMAND_INFORMATION: `*/${commands.HELP} <command_name>* \\- помощь по команде`,
  SPECIFY_NAME: 'Имя швайнокарася не может быть пустым',
  TOO_LARGE_NAME_MSG: `Имя слишком большое! Максимальный размер: *${botConfig.MAX_NAME_LENGTH}*`,
  SWINE_CREATION_MSG: (name: string): string =>
    `Ого у вас родился свин 🐖\\! Его зовут: *${escapeMdV2(name)}*,` + ` *${botConfig.SWINE_DEFAULT_WEIGHT} кг\\.*`,
  SWINE_WEIGHT_MSG: (weight: string): string => `Вес вашего поросенка 🐷: *${weight} кг\\.*`,
  SWINE_RENAME_MSG: (name: string): string => `Теперь вашего 🐷 свина зовут: *${escapeMdV2(name)}*`,
  SWINE_WEIGHT_CHANGE_MSG: (
    name: string,
    weightChange: number,
    weight: number,
    username: string,
    userId: string,
  ): string => {
    return (
      usrMentionMdV2(username, userId) +
      `, Вы покормили вашего свина\\. Ваш 🐖 *${escapeMdV2(name)}* ` +
      `${weightChange > 0 ? messages.GAIN : messages.LOSS}` +
      ` на *${Math.abs(weightChange)} кг* сала\\. Теперь он весит *${weight} кг*`
    );
  },
  SWINE_FEED_TIMEOUT_MSG: (h: number, min: number): string =>
    'Вы уже кормили своего 🐽 хряка за последние ' +
    `*${botConfig.SWINE_FEED_TIMEOUT} ч\\.*\n` +
    messages.NEXT_FEED_TIME_MSG([h, min]),
  SWINE_NOT_EXISTS_MSG: (username: string, userId: string): string =>
    usrMentionMdV2(username, userId) +
    `, У вас еще нет хряка\\! Напишите /${commands.NAME} ` +
    `или /${commands.FEED}\\, чтобы он родился\\.`,
  ACCEPTED_INVALID_FIGHT_MSG: (username: string, userId: string): string =>
    usrMentionMdV2(username, userId) + `, Вы не можете принять вызов\\. Бой уже состоялся`,
  ACCEPTED_INVALID_FIGHT_SESS_MSG: (username: string, userId: string): string =>
    usrMentionMdV2(username, userId) + `, Сессия устарела, вы не можете принять бой`,
  SELF_FIGHT_MSG: 'Вы не можете принять вызов от самого себя',
  LOSS: 'похудел',
  GAIN: 'поправился',

  TOP_WEIGHT_MSG: (chatName: string): string => `🐷Топ швайнокарасей беседы *${escapeMdV2(chatName)}*🐷: \n`,
  TOP_FIGHT_MSG: (chatName: string): string => `🐷💪Топ воинов беседы *${escapeMdV2(chatName)}*🐷: \n`,
  TOP_LVL_MSG: (chatName: string): string => `🆙 Топ самых опытных свинов беседы *${escapeMdV2(chatName)}*🐷: \n`,

  TOP_WEIGHT_ROW_MSG: (pos: number, name: string, weight: number): string =>
    `*${pos}*\\. ${escapeMdV2(name)} \\- *${weight} кг*\n`,
  TOP_FIGHT_ROW_MSG: (pos: number, name: string, points: number, win: number, loss: number, draw: number): string =>
    `*${pos}*\\. ${escapeMdV2(name)} \\- *${escapeMdV2(points.toString())} оч\\.* в\\/н\\/п: ${win}\\/${draw}\\/${loss}\n`,
  TOP_LVL_ROW_MSG: (pos: number, name: string, lvl: number): string =>
    `*${pos}*\\. ${escapeMdV2(name)} \\- *${lvl} ур\\.*\n`,

  TOP_ROW_OWNERS_WEIGHT_MSG: (pos: number, name: string, weight: number, userFirstName: string): string =>
    `*${pos}*\\. ${escapeMdV2(name)} \\- *${weight} кг*, \\- *${escapeMdV2(userFirstName)}*\n`,
  TOP_ROW_OWNERS_FIGHT_MSG: (
    pos: number,
    name: string,
    points: number,
    win: number,
    loss: number,
    draw: number,
    userFirstName: string,
  ): string =>
    `*${pos}*\\. ${escapeMdV2(name)} \\- *${escapeMdV2(points.toString())} оч\\.* в\\/н\\/п: ${win}\\/${draw}\\/${loss}\\- *${escapeMdV2(
      userFirstName,
    )}*\n`,
  TOP_ROW_OWNERS_LVL_MSG: (pos: number, name: string, lvl: number, userFirstName: string): string =>
    `*${pos}*\\. ${escapeMdV2(name)} \\- *${lvl} ур\\.*, \\- *${escapeMdV2(userFirstName)}*\n`,

  SWINE_DELETE_MSG: 'Ваш поросенок был убит\\. Помянем',
  SWINE_STATS_MSG: (
    name: string,
    weight: number,
    mWeight: number,
    hm: [number, number],
    fhm: [number, number],
    fightStats: FightStatisctics,
    lvl: number,
    wir: number,
    dir: number,
    lir: number,
    mwir: number,
    mdir: number,
    mlir: number,
    fedTimes: number,
  ): string =>
    messages.SWINE_MSG(name, lvl, weight) +
    messages.MAX_WEIGHT_MSG(mWeight) +
    messages.FED_TIMES_MSG(fedTimes) +
    messages.NEXT_FEED_TIME_MSG(hm) +
    messages.NEXT_FIGHT_TIME_MSG(fhm) +
    messages.FIGHT_STAT_MSG(fightStats) +
    messages.IN_ROW_MSG(wir, dir, lir) +
    messages.STREAKS_MSG(mwir, mdir, mlir),
  SWINE_INFO_MSG: (
    name: string,
    weight: number,
    mWeight: number,
    hm: [number, number],
    fhm: [number, number],
    fightStats: FightStatisctics,
    lvl: number,
  ): string =>
    messages.SWINE_MSG(name, lvl, weight) +
    messages.NEXT_FEED_TIME_MSG(hm) +
    messages.NEXT_FIGHT_TIME_MSG(fhm) +
    messages.FIGHT_STAT_MSG(fightStats) +
    messages.MAX_WEIGHT_MSG(mWeight),
  CHANNEL_IS_NOT_ALLOWED_MSG: 'Бот не предназначен для каналов, всем пока',
  STREAKS_MSG: (mwir: number, mdir: number, mlir: number): string => `Стрики \\- ${mwir}\\/${mdir}\\/${mlir}\n`,
  SWINE_MSG: (name: string, lvl: number, weight: number): string =>
    `Швайнокарась 🐽 *${escapeMdV2(name)}* *${lvl} ур\\.*, *${weight}* кг\\.\n`,
  FED_TIMES_MSG: (ft: number): string => `Покормлен *${ft}* раз\n`,
  MAX_WEIGHT_MSG: (mw: number): string => `Максимальный вес \\- *${mw} кг*\n`,
  IN_ROW_MSG: (wir: number, dir: number, lir: number): string =>
    `Подряд ${wir != 0 ? 'побед' : dir != 0 ? 'ничьих' : 'поражений'} \\- ` +
    `${wir != 0 ? wir : dir != 0 ? dir : lir},\n`,
  NEXT_FIGHT_TIME_MSG: (hm: [number, number]): string =>
    `Следующая битва доступна через *${hm[0]} ч\\. ${hm[1]} мин\\.*\n`,
  NEXT_FEED_TIME_MSG: (hm: [number, number]): string => `До следующей покормки *${hm[0]} ч\\. ${hm[1]} мин*\\.\n`,
  FIGHT_STAT_MSG: (fightStats: FightStatisctics): string =>
    `Свин поучавствовал в *${fightStats.win + fightStats.loss + fightStats.draw}* сражениях\\.\n` +
    `Из которых выиграл: *${fightStats.win}*, проиграл: *${fightStats.loss}*\n`,
  FIGHT_ALREADY_STARTED: (username: string, userId: string): string =>
    usrMentionMdV2(username, userId) + ` уже вызывает на битву, вы можете принять его вызов\\!`,
  SWINE_ABOUT_TO_DIE: (swineWOwner: SwinesOwners): string =>
    usrMentionMdV2(swineWOwner.username, swineWOwner.userId) +
    `, Ваш свин *${escapeMdV2(swineWOwner.name)}* при смерти, если его не покормить, то через` +
    ` *${botConfig.MINUTES_BEFORE_CLEAN} мин\\.* он умрет 💀\n`,
  SWINE_NOT_FED_LW_MSG: (swineWOwner: SwinesOwnersLW): string =>
    usrMentionMdV2(swineWOwner.username, swineWOwner.userId) +
    `, Вы не кормили свою свинью 🐽 ${escapeMdV2(swineWOwner.name)} долгое время, он` +
    ` начал худеть и ` +
    `потерял ${swineWOwner.wc} кг\\. веса\\. Теперь поросенок весит *${swineWOwner.weight} кг\\.*` +
    ` Если не кормить свина, он может погибнуть\n`,
  SWINES_ABOUT_TO_DIE_ROW: (r: SwinesOwners): string =>
    usrMentionMdV2(r.username, r.userId) + `, свин *${escapeMdV2(r.name)}*\n`,
  SWINES_ABOUT_TO_DIE: (rows: SwinesOwners[]): string =>
    `${rows.length} поросят при смерти, умрут через 15 минут\\:\n` +
    rows.map(r => messages.SWINES_ABOUT_TO_DIE_ROW(r)).join('') +
    '\n',
  SWINES_NOT_FED_LW_ROW: (r: SwinesOwnersLW): string =>
    usrMentionMdV2(r.username, r.userId) +
    `, свин *${escapeMdV2(r.name)}* *${r.weight} кг\\.* потерял *${r.wc} кг\\.*\n`,
  SWINES_NOT_FED_LW: (rows: SwinesOwnersLW[]): string =>
    `${rows.length} свиней не кормили долгое время, они начали терять вес\\:\n` +
    rows.map(r => messages.SWINES_NOT_FED_LW_ROW(r)).join('') +
    '\n',
  CANNOT_FEED_WHEN_FIGHT_STARTED: 'Вы не можете кормить своего свина, так как он ожидает сражения',
  DEAD_SWINES: (name: string): string => `Поросенок *${escapeMdV2(name)}* трагически скончался\\. Вечная память\\!🕯️`,
  ONLY_BEGINNER_CAN_DECLINE: (username: string, userId: string): string =>
    usrMentionMdV2(username, userId) + ', Только пользователь бросивший вызов может его отменить',
  FIGHT_DECLINED: 'Бой отменен',
  CANNOT_DECLINE_DONE_FIGHT: (username: string, userId: string): string =>
    usrMentionMdV2(username, userId) + `, Вы не можете отменить вызов\\. Бой уже состоялся`,
});

export type SwinesOwners = {
  userId: string;
  username: string;
  name: string;
};

export type SwinesOwnersLW = SwinesOwners & {
  wc: number;
  weight: number;
};
