import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";

@EntityRepository()
export class tasksRepository extends Repository<Task> {

}