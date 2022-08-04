import shell from 'shelljs';
import dotenv from 'dotenv';

const CONFIG_PATH = `.${process.env.NODE_ENV}.env`;

console.log(`Using config file: ${CONFIG_PATH}`);

dotenv.config({path: CONFIG_PATH});

shell.exec(`. ./${CONFIG_PATH}`);
shell.exec(`graphile-migrate commit`)
shell.exec(`. ./${CONFIG_PATH}`);
shell.exec(`graphile-migrate migrate`)