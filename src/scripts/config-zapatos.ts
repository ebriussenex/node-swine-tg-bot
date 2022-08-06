import shell from 'shelljs';
import dotenv from 'dotenv';

export function conifgZapatos() {
  const CONFIG_PATH = `.${process.env.NODE_ENV as string}.env`;

  console.log(`Using config file: ${CONFIG_PATH}`);

  dotenv.config({path: CONFIG_PATH});

  shell.exec(`. ./${CONFIG_PATH}`);
  shell.exec(`npx zapatos`);
}
conifgZapatos();
