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

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTask: CreateTaskDto): Task {
  //     return this.taskService.createTask(createTask);
  // }

  // @Delete(':id')
  // deleteTaskById(@Param('id') id:string): void {
  //   this.taskService.deleteTaskById(id);
  // }

  // @Patch('/:id/status')
  // updateTaskById(
  //   @Param('id') id:string,
  //   @Body('status', TaskStatusValiationPipe) status:TaskStatus,
  //   ) : Task {
  //   return this.taskService.updateTaskById(id, status);
  // }
}
