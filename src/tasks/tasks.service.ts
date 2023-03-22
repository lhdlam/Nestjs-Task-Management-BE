import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const {title, description} = createTaskDto;
    
    const task: Task = {
      id: uuidv1(),
      title: title,
      description: description,
      status: TaskStatus.OPEN
    };
    console.log(task)
    this.tasks.push(task)
    return task;
  }
  promise_function(){
    const currentPromise = new Promise((resolve, reject) => {
      let condition = true;
      if (condition){
        setTimeout(()=>{
          resolve('Success');
        }, 3000);
      } else{
        reject('Error');
      }
    });
    currentPromise
    .then((data)=> {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
  }


}
