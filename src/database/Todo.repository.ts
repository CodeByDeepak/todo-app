import { Injectable, Param } from '@nestjs/common';
import { Todo } from './Todo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoRepository {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async create(todo: Todo): Promise<Todo> {
    const newTodo = new this.todoModel(todo);
    return newTodo.save();
  }

  async findOne(id: string): Promise<Todo | null> {
    try {
      const todo = await this.todoModel.findById(id);
      console.log('todo: ', todo);
      if (!todo) {
        return null;
      }

      return todo;
    } catch (error) {
      throw new Error(`Error finding todo by id: ${error.message}`);
    }
  }

  async update(
    @Param('id') id: string,
    updatedTodo: Todo,
  ): Promise<Todo | null> {
    try {
      // Find the existing Todo by id
      const existingTodo = await this.todoModel.findById(id);

      console.log('updatedTodo', updatedTodo);
      if (!existingTodo) {
        return null;
      }

      existingTodo.title = updatedTodo.title;
      existingTodo.description = updatedTodo.description;

      const updated = await existingTodo.save();

      return updated;
    } catch (error) {
      throw new Error(`Error updating todo by id: ${error.message}`);
    }
  }

  async delete(id: string): Promise<Todo | null> {
    return await this.todoModel.findByIdAndRemove(id).exec();
  }
}
