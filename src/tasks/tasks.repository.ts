

// import { EntityRepository , Repository } from 'typeorm'
// import { CreateTaskDto } from './dto/create-task.dto'
// import { TaskStatus } from './enum/tasks-status.enum';
// import { Task } from './task.entity'

// @EntityRepository(Task)
// export class TaskRepository extends Repository<Task> {
//   async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
//     const {title, description} = createTaskDto;
//     const task = new Task

//     task.title = title;
//     task.description = description;
//     task.status = TaskStatus.OPEN;
//     await task.save();

//     return task

//   }

// }

import { Injectable, Logger } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { User } from 'src/auth/use.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './enum/tasks-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  private logger = new Logger('Task Repository')
  async getTasks(filterDto: GetTasksFilterDto, user: User):Promise<Task[]>{
    const {status, search} = filterDto;
    const query = this.createQueryBuilder('task');


    query.where("task.userId = :id",{id: user.id})
    if(status){
      query.where("task.status=:status",{status})
    }
    if(search){
      query.where("(task.title LIKE :search OR task.description LIKE :search)",{search: `%${search}%`});
    }
    try{

      const tasks = await query.getMany();
      return tasks
    } catch (error){
      this.logger.error(`Failed to get tasks for user "${user.username}". DTO: ${JSON.stringify(filterDto)}`,error.stack);
      throw new InternalServerErrorException()
    }


  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
    const {title, description} = createTaskDto;
    const task = new Task

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user
    await task.save();
    delete task.user;

    try{
      return task
    } catch (error){
      this.logger.error(`Failed to get tasks for user "${user.username}". DTO: ${JSON.stringify(createTaskDto)}`,error.stack);
      throw new InternalServerErrorException()
    }


  }
}
