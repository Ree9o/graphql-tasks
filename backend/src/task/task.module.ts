import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TaskResolver, TaskService],
  imports: [PrismaModule],
})
export class TaskModule {}
