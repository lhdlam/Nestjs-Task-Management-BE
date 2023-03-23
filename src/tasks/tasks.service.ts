import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskStatus } from './enum/tasks-status.enum';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import {InjectRepository} from '@nestjs/typeorm'
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ){
  }
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilter(filterDto: GetTasksFilterDto): Task[]{
  //   const {status, search} = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status){
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search){
  //     console.log(search)
  //     tasks = tasks.filter(task =>
  //       task.title.includes(search)||
  //       task.description.includes(search),
  //     );
  //   }



  //   return tasks


  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const {title, description} = createTaskDto;

  //   const task: Task = {
  //     id: uuidv1(),
  //     title: title,
  //     description: description,
  //     status: TaskStatus.OPEN
  //   };
  //   this.tasks.push(task)
  //   return task;
  // }
  // promise_function(){
  //   const currentPromise = new Promise((resolve, reject) => {
  //     let condition = true;
  //     if (condition){
  //       setTimeout(()=>{
  //         resolve('Success');
  //       }, 3000);
  //     } else{
  //       reject('Error');
  //     }
  //   });
  //   currentPromise
  //   .then((data)=> {
  //     console.log(data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  async getTaskById(id: number): Promise<Task>{
    const found = await this.taskRepository.findOne({ where: { id } });
    
    if (!found){
      throw new NotFoundException(`Task with ID "${id} not found`)
    }
    return found;
  }


  async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
    return this.taskRepository.createTask(createTaskDto)
  }

  async deleteTask(id: number) : Promise<any> {
    const result =  await this.taskRepository.delete(id);
    if (result.affected==0){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    else{
      return "Delete Success!!!!"
    }
  }


  // getTaskById(id: string): Task{
  //   const found =  this.tasks.find(task => task.id === id);
  //   if (!found){
  //     throw new NotFoundException(`Task with ID "${id} not found`)
  //   }
  //   return found
  // }

  // deleteTaskById(id: string){
  //   const found =  this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== id);
  // }

  // updateTaskById(id: string, status: TaskStatus){
  //   const data = this.getTaskById(id);
  //   data.status = status;
  //   return data
  // }

}
