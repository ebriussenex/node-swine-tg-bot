import {botConfig} from './config';

export const commands = Object.freeze({
  NAME: 'name',
  FEED: 'feed',
  TOP: 'top',
  HELP: 'help',
  WEIGHT: 'weight',
  MY_SWINE: 'my_swine',
});

export const messages = Object.freeze({
  TOO_LARGE_NAME_MSG:
    `Имя слишком большое! Максимальный размер:` + `${botConfig.MAX_NAME_VALUE}`,
  SWINE_CREATION_MSG: (name: string) =>
    `Ого у вас родился свин! Его зовут: ${name}`,
  SWINE_WEIGHT_MSG: (weight: string) => `Вес вашего поросенка: ${weight} кг.`,
  SWINE_RENAME_MSG: (name: string) => `Теперь вашего свина зовут: ${name}`,
  SWINE_WEIGHT_CHANGE_MSG: (
      name: string,
      weightChange: number,
      weight: number,
  ) => {
    const change = weightChange > 0 ? messages.GAIN : messages.LOSS;
    return (
      `Вы покормили вашего свина. Ваш ${name} ` +
      `${change}` +
      ` на ${weightChange} кг сала. Теперь он весит ${weight} кг`
    );
  },
  SWINE_FEED_TIMEOUT_MSG: (h: number, min: number) =>
    `Вы уже кормили своего хряка за последние ` +
    `${botConfig.SWINE_FEED_TIMEOUT}, следующая ` +
    `покормка через ${h} ч. ${min} мин.`,
  WRONG_COMMAND_MESSAGE:
    `Неизвестная команда, используйте комманду ` +
    `/${commands.HELP} для списка комманд.`,
  SWINE_NOT_EXISTS_MSG:
    `У вас еще нет хряка! Напишите /${commands.NAME} ` +
    `или /${commands.FEED}, чтобы он родился.`,
  LOSS: 'похудел',
  GAIN: 'поправился',
  TOP_MSG: 'Топ швайнокарасей: \n',
  TOP_ROW_MSG: (pos: number, name: string, weight: number) =>
    `${pos}. ${name} - ${weight} кг\n`,
  SWINE_DELETE_MSG: 'Ваш поросенок был убит. Помянем',
  SWINE_INFO_MSG: (name: string, weight: number, h: number, m: number) =>
    `Швайнокарась ${name}, ${weight} кг, до следующего кормления: ${h} ч. ` +
    `${m} минут`,
});

export const dbConst = Object.freeze({
  SWINE_TABLE: 'pig',
  TG_USER_TABLE: 'tg_users',
  TG_CHAT_TABLE: 'tg_chat',
  ID_FIELD: 'id',
  CHAT_ID_FIELD: 'chat_id',
  NAME_FIELD: 'name',
  WEIGHT_FIELD: 'weight',
  LAST_TIME_FED_FIELD: 'last_time_fed',
  TOP_AMOUNT: 10
});
