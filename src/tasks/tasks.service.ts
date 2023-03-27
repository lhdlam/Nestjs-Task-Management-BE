import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskStatus } from './enum/tasks-status.enum';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import {InjectRepository} from '@nestjs/typeorm'
import { Task } from './task.entity';
import { User } from 'src/auth/use.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ){}

  async getTask(filterDto: GetTasksFilterDto, user: User):Promise<Task[]>{
    return this.taskRepository.getTasks(filterDto, user)
  }

  async getTaskById(id: number, user: User): Promise<Task>{
    const found = await this.taskRepository.findOne({where:{id, userId : user.id}});
    
    if (!found){
      throw new NotFoundException(`Task with ID "${id} not found`)
    }
    return found;
  }


  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
    return this.taskRepository.createTask(createTaskDto, user)
  }

  async deleteTask(id: number, user: User) : Promise<any> {
    const result =  await this.taskRepository.delete({id, userId :user.id});
    if (result.affected==0){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    else{
      return "Delete Success!!!!"
    }
  }


  async updateTaskById(id: number, status: TaskStatus, user: User){
    const data = await this.getTaskById(id, user);
    data.status = status;
    data.save();

    return data
  }

}
