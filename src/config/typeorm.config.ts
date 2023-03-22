import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true,
  };
};