import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

getTasksWithFilters(filterDto:GetTasksFilter ) : Task []{
    const { status, search } = filterDto
    let tasks = this.getAllTasks()
    if ( status){
    tasks = tasks.filter((task) => task.status = status )
    }
    if (search){
        tasks = tasks.filter(task => task.description.includes(search))
    }
    return tasks
}

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string) {
    const tasks = this.tasks;

   const found =  tasks.find((task: Task) => (task.id = id));

   if (!found){
    throw new NotFoundException();
   }

   return found
    
  }

  DeleteById(id:string) {
   this.tasks = this.tasks.filter(task => task.id != id)
   return this.tasks
  }

  updateTask(id:string, status:TaskStatus){
    const task = this.getTaskById(id)
    const index = this.tasks.indexOf(task)
    this.DeleteById(id)
    task.status = status
    this.tasks[index] = task
    return task

  }
}
