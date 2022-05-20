import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class UpdateTasksStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
