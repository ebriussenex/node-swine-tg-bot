import {botConfig} from '../conf/config';

type Command = {
  name: string;
  description: string;
};

export const forbiddenSymbols: string[] = ['`', '$', '{', '}'];

export const commandsDescr: Command[] = [
  {
    name: '/name',
    description: `/name <name> - Создает поросенка, если еще не был создан, ` +
    `если <name> ` +
    `не задан, создает со стандартным именем ${botConfig.SWINE_DEFAULT_NAME} ` +
    `и весом ${botConfig.SWINE_DEFAULT_WEIGHT}.` +
    `Если свин уже существует переименовывает - /name <name>, максимальная ` +
    `длина имени: ${botConfig.MAX_NAME_LENGTH}, имя не может быть пустым. ` +
    `Имя не может содержать символы: ${forbiddenSymbols.join(' ,')}`},
  {
    name: '/feed',
    description: `Создает поросенка, если еще не был создан, со стандартным ` +
    `именем ${botConfig.SWINE_DEFAULT_NAME} и весом ` +
    `${botConfig.SWINE_DEFAULT_WEIGHT}. Если свин уже существует, эта команда` +
    ` кормит поросенка. Кормить можно раз в 24 часа. После кормления свин ` +
    `может потолстеть или похудеть.`,
  },
  {
    name: '/top',
    description: 'Возвращает топ швайнокарасей беседы.',
  },
  {
    name: '/help',
    description: '/help <command_name ...> Описание комманд, идущих через ' +
    'пробел. Если комманды не указаны, то возвращает описание всех комманд',
  },
  {
    name: '/swine',
    description: 'Информация о вашей свинье.',
  },
  {
    name: '/info',
    description: 'Информация о боте',
  },
];
export const commands = Object.freeze({
  NAME: 'name',
  FEED: 'feed',
  TOP: 'top',
  HELP: 'help',
  WEIGHT: 'weight',
  MY_SWINE: 'swine',
  KILL: 'kill',
  INFO: 'info',
});

export const messages = Object.freeze({
  NO_SUCH_COMMAND: (command: string): string =>
    `Нет информации о команде ${command}`,
  BOT_DESCRIPTION_MSG: `Телеграм-бот swinebot. Позволяет выращивать свиней в ` +
    `телеграм-чате. Для описания команд, напишите /${commands.HELP}`,
  FORBIDDEN_NAME_CHAR_MSG: (char: string): string =>
    `Имя содержит запрещенные символы :${char} запрещены: ` +
    `${forbiddenSymbols.join(' ,')}`,
  COMMAND_INFORMATION: `/${commands.HELP} <command_name> - помощь по команде`,
  SPECIFY_NAME: 'Имя швайнокарася не может быть пустым',
  TOO_LARGE_NAME_MSG:
    `Имя слишком большое! Максимальный размер: ${botConfig.MAX_NAME_LENGTH}`,
  SWINE_CREATION_MSG: (name: string): string =>
    `Ого у вас родился свин! Его зовут: ${name}`,
  SWINE_WEIGHT_MSG: (weight: string): string =>
    `Вес вашего поросенка: ${weight} кг.`,
  SWINE_RENAME_MSG: (name: string): string =>
    `Теперь вашего свина зовут: ${name}`,
  SWINE_WEIGHT_CHANGE_MSG: (
      name: string,
      weightChange: number,
      weight: number,
  ): string => {
    return (
      `Вы покормили вашего свина. Ваш ${name} ` +
      `${weightChange > 0 ? messages.GAIN : messages.LOSS}` +
      ` на ${Math.abs(weightChange)} кг сала. Теперь он весит ${weight} кг`
    );
  },
  SWINE_FEED_TIMEOUT_MSG: (h: number, min: number): string =>
    'Вы уже кормили своего хряка за последние ' +
    `${botConfig.SWINE_FEED_TIMEOUT} ч., следующая ` +
    `покормка через ${h} ч. ${min} мин.`,
  WRONG_COMMAND_MESSAGE:
    'Неизвестная команда, используйте комманду ' +
    `/${commands.HELP} для списка комманд.`,
  SWINE_NOT_EXISTS_MSG:
    `У вас еще нет хряка! Напишите /${commands.NAME} ` +
    `или /${commands.FEED}, чтобы он родился.`,
  LOSS: 'похудел',
  GAIN: 'поправился',
  TOP_MSG: (chatName: string): string =>
    `Топ швайнокарасей беседы ${chatName}: \n`,
  TOP_ROW_MSG: (pos: number, name: string, weight: number): string =>
    `${pos}. ${name} - ${weight} кг\n`,
  SWINE_DELETE_MSG: 'Ваш поросенок был убит. Помянем',
  SWINE_INFO_MSG: (
      name: string,
      weight: number,
      h: number,
      m: number,
  ): string =>
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
  TOP_AMOUNT: 10,
});
