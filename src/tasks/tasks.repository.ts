

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

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enum/tasks-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
    
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
    const {title, description} = createTaskDto;
    const task = new Task

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task

  }
}
