import { createApp } from '@/app'
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const { app, listen } = createApp();
listen();