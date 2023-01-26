import { Config } from '@config/configuration.interface';

// eslint-disable
export default (): Config => ({
  nest: {
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT ?? '8080', 10),
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
  database: {
    url: process.env.DATABASE_URL,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
