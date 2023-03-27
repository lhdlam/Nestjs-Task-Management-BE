import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValiationPipe } from './pipe/task-status-validation.pipe';
import { TaskStatus } from './enum/tasks-status.enum';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/use.entity';
import { Logger } from '@nestjs/common/services';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('Tasks Controller')
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
    ):Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retieving all tasks. Fillter: ${JSON.stringify(filterDto)}`)
    return this.taskService.getTask(filterDto, user);
  }

  @Get(':id')
  getTaskById(
    @Param('id', ParseIntPipe) id:number,
    @GetUser() user: User,
    ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
    ): Promise<Task> {
      this.logger.verbose(`User "${user.username}" create new task. Data: ${JSON.stringify(createTaskDto)}`)
      return this.taskService.createTask(createTaskDto, user);
  }

  @Delete(':id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id:number,
    @GetUser() user: User,
    ): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id:number,
    @Body('status', TaskStatusValiationPipe) status:TaskStatus,
    @GetUser() user: User,
    ) : Promise<Task> {
    return this.taskService.updateTaskById(id, status, user);
  }
}
