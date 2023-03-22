import { TaskStatus } from "../enum/tasks-status.enum";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";


export class GetTasksFilterDto{
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  search: string;
}