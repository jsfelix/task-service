import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";
import { Task } from "../entities/Task";

export interface ITaskRepository {
  create(data: ICreateTaskDTO): Promise<Task>;
  save(task: Task): Promise<void>;
  findByUser(userId: number): Promise<Task[]>;
  findById(id: string): Promise<Task | undefined>;
}
