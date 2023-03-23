import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { getTypeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
