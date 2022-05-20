import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { Task } from './task.entity';
import { ITask, TaskStatus } from './tasks.model';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    async getTasks(filterDto: GetTasksFilterDto): Promise<ITask[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                { search: `%${search}%` },
            );
        }

        if (search) {
            query.andWhere('task.status = :status', { status });
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        return await this.save(task);
    }
}
