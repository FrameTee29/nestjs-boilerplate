export interface Config {
  nest: NestConfig;
  redis: RedisConfig;
  database: DatabaseConfig;
}

export interface NestConfig {
  env: string | undefined;
  port: number;
}

export interface RedisConfig {
  host: string | undefined;
  port: string | undefined;
  password: string | undefined;
}

export interface DatabaseConfig {
  url: string | undefined;
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
}
