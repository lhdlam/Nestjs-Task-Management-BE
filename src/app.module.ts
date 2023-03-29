import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { getTypeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    TasksModule,
    AuthModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
