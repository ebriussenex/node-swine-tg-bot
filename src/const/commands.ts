import {botConfig} from '../conf/config';

type Command = {
    name: string;
    description: string;
  };

export const forbiddenSymbols: string[] = [
  '`', '$', '{', '}', '/', '#', '@', '_', '\'', '\"', '\\', '<', '>', '^', '*',
  ':', ';', '[', ']', ')', '(', '+', '-', '.', '!', '&',
];

export const commandsDescr: Command[] = [
  {
    name: '/name',
    description: '\t*/name <name>* - Создает поросенка, если еще не был создан, если *<name>* не задан, создает ' +
      `со стандартным именем *${botConfig.SWINE_DEFAULT_NAME}* и весом *${botConfig.SWINE_DEFAULT_WEIGHT} кг*. ` +
      'Если свин уже существует переименовывает - */name <name>*, максимальная длина имени: ' +
      `*${botConfig.MAX_NAME_LENGTH}*, ` +
       `имя не может быть пустым. Имя не может содержать символы: \`\`\`${forbiddenSymbols.join(' ,')}\`\`\``,
  },
  {
    name: '/feed',
    description: '\tСоздает поросенка, если еще не был создан, со стандартным именем ' +
      `*${botConfig.SWINE_DEFAULT_NAME}* и весом *${botConfig.SWINE_DEFAULT_WEIGHT} кг*. ` +
      'Если свин уже существует, эта ' +
      'команда кормит поросенка. Кормить можно раз в *24* часа. После кормления свин может потолстеть или похудеть',
  },
  {
    name: '/top',
    description: '\tВозвращает топ швайнокарасей беседы',
  },
  {
    name: '/help',
    description: '\t*/help <command_name ...>* Описание комманд, идущих через пробел. Если комманды не указаны, то ' +
      'возвращает описание всех комманд',
  },
  {
    name: '/swine',
    description: '\tИнформация о вашей свинье',
  },
  {
    name: '/info',
    description: '\tИнформация о боте',
  },
  {
    name: '/fight',
    description: `\tСвиньи могут сражаться раз в ${botConfig.SWINE_FIGHT_TIMEOUT}, чтобы начать бой необходимо, ` +
    'чтобы свин весом был больше ' +
    `${botConfig.MIN_FIGHT_WEIGHT}. В битве кроме победы однйо из свиней еще и возможна ничья.`,
  },
  {
    name: '/otop',
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
