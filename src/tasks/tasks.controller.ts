import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { UpdateTasksStatusDto } from './dtos/update-task-status.dto';
import { ITask } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get('')
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<ITask[]> {
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    async getTaskById(@Param() id: string): Promise<ITask> {
        return this.tasksService.getTaskById(id);
    }

    @Post('')
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<ITask> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(@Param() id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param() id: string,
        @Body() updateTaskStatusDto: UpdateTasksStatusDto,
    ): Promise<ITask> {
        return this.tasksService.updateTaskStatus(
            id,
            updateTaskStatusDto.status,
        );
    }
}
