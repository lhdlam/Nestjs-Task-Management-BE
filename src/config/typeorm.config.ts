import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/use.entity";
import { Task } from "src/tasks/task.entity";
import * as config from 'config'

const dbConfig = config.get('db')

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: Number(process.env.RDS_PORT) || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DATABASE || dbConfig.database,
    entities: [Task, User],
    synchronize: Boolean(process.env.TYPEORM_SYNC) || dbConfig.synchronize,
  };
};