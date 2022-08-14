/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import localtunnel, { Tunnel } from 'localtunnel';
import dotenv from 'dotenv';

const CONFIG_PATH = `.${process.env.NODE_ENV as string}.env`;
dotenv.config({ path: CONFIG_PATH });

export const getTunnel = async (): Promise<string> => {
  const tunnel: Tunnel = await localtunnel({ port: parseInt(process.env.PORT as string) });
  console.log(`Started localtunnel on url:port - ` + `${tunnel.url}:${process.env.PORT as string}`);
  return tunnel.url as string;
};
