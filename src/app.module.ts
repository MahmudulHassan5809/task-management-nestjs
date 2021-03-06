import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'mahmudul',
            password: '152155809',
            database: 'task_management',
            autoLoadEntities: true,
            synchronize: true,
        }),
        AuthModule,
    ],
})
export class AppModule {}
