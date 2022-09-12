import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { Task } from "../../entities/Task";
import { ITaskRepository } from "../ITaskRepository";

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  public async create(data: ICreateTaskDTO): Promise<Task> {
    const task = new Task(data.title, data.description, data.userId);
    this.tasks.push(task);
    return task;
  }

  public async save(task: Task): Promise<void> {
    const index = this.tasks.findIndex(
      (findTask) => findTask.title === task.title
    );
    this.tasks[index] = task;
  }

  public async findByUser(userId: number): Promise<Task[]> {
    return this.tasks.filter((task) => task.userId === userId);
  }

  public async findById(id: string): Promise<Task | undefined> {
    return this.tasks.find((task) => task.id === id);
  }
}
