import * as process from 'process';
import * as dotenv from 'dotenv';
import { Config } from './config.interface';

dotenv.config();
const config: Config = {
  nest: {
    port: parseInt(process.env.PORT) || 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Parse Data Documentation',
    description: 'Parse data to excel',
    version: '1.0',
    path: '/',
  },
};

export default (): Config => config;
