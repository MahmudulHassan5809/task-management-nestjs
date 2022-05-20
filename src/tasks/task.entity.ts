import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { ITask, TaskStatus } from './tasks.model';

@Entity()
export class Task implements ITask {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToMany((_type) => User, (user) => user.tasks, { eager: false })
    user: User;
}
