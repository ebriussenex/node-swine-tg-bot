import shell from 'shelljs';
import dotenv from 'dotenv';

export function conifgZapatos() {
  const CONFIG_PATH = `.${process.env.NODE_ENV as string}.env`;

  console.log(`Configuring zapatos`);

  dotenv.config({ path: CONFIG_PATH });

  console.log(shell.exec(`. ./${CONFIG_PATH}`));
  console.log(shell.exec(`npx zapatos`));
}
conifgZapatos();
