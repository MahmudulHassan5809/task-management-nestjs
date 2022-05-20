import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { ITask, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
    private tasks: ITask[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        if (search) {
            tasks = tasks.filter((task) => {
                if (
                    task.title.includes(search) ||
                    task.description.includes(search)
                ) {
                    return true;
                }
                return false;
            });
        }

        return tasks;
    }

    getTaskById(id: string): ITask {
        const task = this.tasks.find((task) => task.id === id);
        if (!task) {
            throw new NotFoundException('task not found');
        }
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): ITask {
        const { title, description } = createTaskDto;

        const task: ITask = {
            id: randomUUID(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== found.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): ITask {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
