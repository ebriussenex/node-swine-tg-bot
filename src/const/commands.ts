import { BotCommand } from 'telegraf/typings/core/types/typegram';
import { botConfig } from '../conf/config';
import { escapeMdV2 } from './messages';

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
  TOP_OWNERS: 'top_owners',
  SWINE_STATS: 'stats',
  TOP_FIGHTERS: 'top_fight',
  TOP_EXP: 'top_exp',
});

export const commandsVerboseDescr: BotCommand[] = [
  {
    command: '/name',
    description:
      '\t*/name <name\\>* \\- Создает поросенка, если еще не был создан, если *<name\\>* не задан, создает ' +
      `со стандартным именем *${botConfig.SWINE_DEFAULT_NAME}* и весом *${botConfig.SWINE_DEFAULT_WEIGHT} кг*\\. ` +
      'Если свин уже существует переименовывает \\- */name <name\\>*, максимальная длина имени: ' +
      `*${botConfig.MAX_NAME_LENGTH}*, ` +
      `имя не может быть пустым\\.`,
  },
  {
    command: '/feed',
    description:
      '\tСоздает поросенка, если еще не был создан, со стандартным именем ' +
      `*${botConfig.SWINE_DEFAULT_NAME}* и весом *${botConfig.SWINE_DEFAULT_WEIGHT} кг*\\. ` +
      'Если свин уже существует, эта ' +
      `команда кормит поросенка\\. Кормить можно раз в *${botConfig.SWINE_FEED_TIMEOUT}* часа\\. После кормления свин может потолстеть или похудеть`,
  },
  {
    command: '/top',
    description: '\tВозвращает топ швайнокарасей беседы',
  },
  {
    command: '/help',
    description:
      '\t* /help <command \\.\\.\\.\\> * Описание комманд, идущих через пробел\\. Если комманды не указаны, то ' +
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
      `\tСвиньи могут сражаться раз в *${botConfig.SWINE_FIGHT_TIMEOUT}* ч, чтобы начать бой необходимо, ` +
      'чтобы свин весом был больше ' +
      `*${botConfig.MIN_FIGHT_WEIGHT}* кг\\. В битве кроме победы одной из свиней тка же возможна ничья\\.`,
  },
  {
    command: '/top_owners',
    description: 'Топ свиней с именами владельцев',
  },
  {
    command: '/stats',
    description: 'Подробная статистика',
  },
  {
    command: '/top_fight',
    description: 'Лучшие бойцы',
  },
  {
    command: '/top_exp',
    description: 'Топ по опыту',
  },
];

export const commandsDescr: BotCommand[] = [
  {
    command: `/${commands.NAME}`,
    description: 'Создать свина с именем или переименовать',
  },
  {
    command: `/${commands.FEED}`,
    description: 'Накормить поросенка',
  },
  {
    command: `/${commands.TOP}`,
    description: 'Топ швайнокарасей',
  },
  {
    command: `/${commands.HELP}`,
    description: 'Подробное описание команд',
  },
  {
    command: `/${commands.MY_SWINE}`,
    description: 'Информация о вашей свинье',
  },
  {
    command: `/${commands.INFO}`,
    description: 'Информация о боте',
  },
  {
    command: `/${commands.FIGHT}`,
    description: 'Вызвать на PVP поединок или принять',
  },
  {
    command: `/${commands.TOP_OWNERS}`,
    description: 'Топ свиней с именами владельцев',
  },
  {
    command: `${commands.SWINE_STATS}`,
    description: 'Подробная статистика',
  },
  {
    command: `${commands.TOP_FIGHTERS}`,
    description: 'Лучшие бойцы',
  },
  {
    command: `${commands.TOP_EXP}`,
    description: 'Топ по опыту',
  },
];
