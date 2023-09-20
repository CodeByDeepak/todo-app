import { Injectable } from '@nestjs/common';
import { TodoRepository } from 'src/database/Todo.repository';
import { Todo } from 'src/database/Todo.schema';

@Injectable()
export class TodoService {
  // findOne(id: string): Todo | PromiseLike<Todo> {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private readonly todoRepository: TodoRepository) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async create(todo: Todo): Promise<Todo> {
    return this.todoRepository.create(todo);
  }

  async findOne(id: string): Promise<Todo | null> {
    const result = await this.todoRepository.findOne(id);
    console.log('result', result);
    return result;
  }

  async update(id: string, todo: Todo): Promise<Todo> {
    return await this.todoRepository.update(id, todo);
  }
  async delete(id: string): Promise<Todo | null> {
    return await this.todoRepository.delete(id);
  }
}
