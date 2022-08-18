import { BotCommand } from 'telegraf/typings/core/types/typegram';
import { botConfig } from '../conf/config';

export const forbiddenSymbols: string[] = [
  '`',
  '$',
  '{',
  '}',
  '/',
  '#',
  '@',
  '_',
  "'",
  '"',
  '\\',
  '<',
  '>',
  '^',
  '*',
  ':',
  ';',
  '[',
  ']',
  ')',
  '(',
  '+',
  '-',
  '.',
  '!',
  '&',
];

export const commandsVerboseDescr: BotCommand[] = [
  {
    command: '/name',
    description:
      '\t*/name <name>* - Создает поросенка, если еще не был создан, если *<name>* не задан, создает ' +
      `со стандартным именем *${botConfig.SWINE_DEFAULT_NAME}* и весом *${botConfig.SWINE_DEFAULT_WEIGHT} кг*. ` +
      'Если свин уже существует переименовывает - */name <name>*, максимальная длина имени: ' +
      `*${botConfig.MAX_NAME_LENGTH}*, ` +
      `имя не может быть пустым. Имя не может содержать символы: \`\`\`${forbiddenSymbols.join(' ,')}\`\`\``,
  },
  {
    command: '/feed',
    description:
      '\tСоздает поросенка, если еще не был создан, со стандартным именем ' +
      `*${botConfig.SWINE_DEFAULT_NAME}* и весом *${botConfig.SWINE_DEFAULT_WEIGHT} кг*. ` +
      'Если свин уже существует, эта ' +
      'команда кормит поросенка. Кормить можно раз в *24* часа. После кормления свин может потолстеть или похудеть',
  },
  {
    command: '/top',
    description: '\tВозвращает топ швайнокарасей беседы',
  },
  {
    command: '/help',
    description:
      '\t*/help <command_name ...>* Описание комманд, идущих через пробел. Если комманды не указаны, то ' +
      'возвращает описание всех комманд',
  },
  {
    command: '/swine',
    description: '\tИнформация о вашей свинье',
  },
  {
    command: '/info',
    description: '\tИнформация о боте',
  },
  {
    command: '/fight',
    description:
      `\tСвиньи могут сражаться раз в ${botConfig.SWINE_FIGHT_TIMEOUT} ч, чтобы начать бой необходимо, ` +
      'чтобы свин весом был больше ' +
      `${botConfig.MIN_FIGHT_WEIGHT} кг. В битве кроме победы однйо из свиней еще и возможна ничья.`,
  },
  {
    command: '/otop',
    description: 'Топ свиней с именами владельцев',
  },
];

export const commandsDescr: BotCommand[] = [
  {
    command: '/name',
    description: 'Создать свина с именем или переименовать',
  },
  {
    command: '/feed',
    description: 'Накормить поросенка',
  },
  {
    command: '/top',
    description: 'Топ швайнокарасей',
  },
  {
    command: '/help',
    description: 'Подробное описание команд',
  },
  {
    command: '/swine',
    description: 'Информация о вашей свинье',
  },
  {
    command: '/info',
    description: 'Информация о боте',
  },
  {
    command: '/fight',
    description: 'Вызвать на PVP поединок или принять',
  },
  {
    command: '/otop',
    description: 'Топ свиней с именами владельцев',
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
  FIGHT: 'fight',
  TOP_OWNERS: 'otop',
});
