import { Task } from "../entities/Task";
import { Status } from "../enums/status";
import { ITaskRepository } from "../repositories/ITaskRepository";

type CreateTaskParams = {
  title: string;
  description: string;
  userId: number;
};

type ChangeStatusParams = {
  taskId: string;
  newStatus: Status;
  userId: number;
};

type ArchiveTaskParams = {
  taskId: string;
  userId: number;
};

type ViewTaskParams = {
  taskId: string;
  userId: number;
};

export class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  public async create({
    title,
    description,
    userId,
  }: CreateTaskParams): Promise<Task> {
    if (!userId) throw new Error("user is required");
    const task = await this.taskRepository.create({
      title,
      description,
      userId,
    });
    return task;
  }

  public async view({ taskId, userId }: ViewTaskParams): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new Error("task not found");
    if (task.userId !== userId) throw new Error("not authorized");
    return task;
  }

  public async changeStatus({ taskId, newStatus, userId }: ChangeStatusParams) {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new Error("task does not exist");
    if (task.userId !== userId) throw new Error("not authorized");
    task.moveTo(newStatus);
    await this.taskRepository.save(task);
    return task;
  }

  public async list(userId: number): Promise<Task[]> {
    if (!userId) throw new Error("user is required");
    const tasks = await this.taskRepository.findByUser(userId);
    return tasks;
  }
}
