import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValiationPipe } from './pipe/task-status-validation.pipe';
import { TaskStatus } from './enum/tasks-status.enum';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if(Object.keys(filterDto).length){
  //     return this.taskService.getTaskWithFilter(filterDto);
  //   } else{
  //     return this.taskService.getAllTasks();
  //   }
  // }

  // @Get('qqq')
  // promise_function(){
  //   return this.taskService.promise_function();
  // }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id:number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
      return this.taskService.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTaskById(@Param('id', ParseIntPipe) id:number): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  // @Patch('/:id/status')
  // updateTaskById(
  //   @Param('id') id:string,
  //   @Body('status', TaskStatusValiationPipe) status:TaskStatus,
  //   ) : Task {
  //   return this.taskService.updateTaskById(id, status);
  // }
}
