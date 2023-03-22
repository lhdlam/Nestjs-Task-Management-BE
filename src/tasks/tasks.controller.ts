import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('qqq')
  promise_function(){
    return this.taskService.promise_function();
  }

  @Post()
  createTask(@Body() createTask: CreateTaskDto): Task {
      return this.taskService.createTask(createTask);
  }
}
