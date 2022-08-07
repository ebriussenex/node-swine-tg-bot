import shell from 'shelljs';
import dotenv from 'dotenv';

const CONFIG_PATH = `.${process.env.NODE_ENV as string}.env`;

console.log(`Migrating database...`);

dotenv.config({path: CONFIG_PATH});
export const migrateDb = () => {
  console.log(shell.exec(`. ./${CONFIG_PATH}`));
  console.log(shell.exec(`graphile-migrate commit`));
  console.log(shell.exec(`. ./${CONFIG_PATH}`));
  console.log(shell.exec(`graphile-migrate migrate`));
};
