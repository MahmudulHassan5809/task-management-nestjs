import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { ITask, TaskStatus } from './tasks.model';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private taskRepository: TasksRepository,
    ) {}

    getTasks(filterDto: GetTasksFilterDto): Promise<ITask[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: string): Promise<ITask> {
        const task = await this.taskRepository.findOne(id);
        if (!task) {
            throw new NotFoundException('task not found');
        }
        return task;
    }
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<ITask> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string): Promise<void> {
        const res = await this.taskRepository.delete(id);
        if (res.affected === 0) {
            throw new NotFoundException('task not found');
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<ITask> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
}
