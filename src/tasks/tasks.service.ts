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

    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<ITask[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: string, user: User): Promise<ITask> {
        const task = await this.taskRepository.findOne({ where: { id, user } });
        if (!task) {
            throw new NotFoundException('task not found');
        }
        return task;
    }
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<ITask> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string, user: User): Promise<void> {
        const res = await this.taskRepository.delete({ id, user });
        if (res.affected === 0) {
            throw new NotFoundException('task not found');
        }
    }

    async updateTaskStatus(
        id: string,
        status: TaskStatus,
        user: User,
    ): Promise<ITask> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
}
