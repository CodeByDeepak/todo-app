import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoRepository } from 'src/database/Todo.repository';
import { Todo, TodoSchema } from 'src/database/Todo.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [Todo, TodoRepository, TodoService],
})
export class TodoModule {}
