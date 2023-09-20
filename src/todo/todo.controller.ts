import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from 'src/database/Todo.schema';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post('/')
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    const result = await this.todoService.findOne(id);
    console.log('result: ', result);
    return result;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedTodo: Todo,
  ): Promise<Todo> {
    console.log('updated Todo:', updatedTodo);
    const updated = await this.todoService.update(id, updatedTodo);

    if (!updated) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return updated;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Todo | null> {
    return await this.todoService.delete(id);
  }
}
