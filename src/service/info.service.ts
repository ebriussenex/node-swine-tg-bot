import { commands, commandsDescr } from '../const/commands';
import { messages } from '../const/messages';

export const infoService = Object.freeze({
  getHelpOnCommands: (text: string): string => {
    const reqCommands: string[] = parseCommandArgs(text, commands.HELP.length);
    let msg = '';
    if (reqCommands.length === 0) {
      msg = commandsDescr.map((command, index) => `${index + 1}. ${command.name}\n\t${command.description}\n`).join('');
    } else {
      let counter = 1;
      commandsDescr.map(command => {
        if (reqCommands.includes(command.name) || reqCommands.includes(command.name.slice(1))) {
          msg += `${counter}. ${command.name}\n\t${command.description}\n`;
          counter++;
        }
      });
    }
    if (msg === '' && reqCommands.length === 1) {
      msg = messages.NO_SUCH_COMMAND(reqCommands[0]);
    }
    return msg;
  },
});

function parseCommandArgs(command: string, commandLength: number): string[] {
  command = command.trim();
  return command.length >= commandLength + 2 && command[commandLength + 1] === ' '
    ? command
        .slice(commandLength + 2)
        .trim()
        .split(' ')
        .filter(e => e !== '')
    : [];
}
