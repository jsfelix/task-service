import { Task } from "../entities/Task";
import { Status } from "../enums/status";
import { InMemoryTaskRepository } from "../repositories/implementation/InMemoryTaskRepository";
import { TaskService } from "./TaskService";

let taskRepository: InMemoryTaskRepository;
let taskService: TaskService;

describe("TaskService", () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository();
    taskService = new TaskService(taskRepository);
  });

  it("should create new task", async () => {
    const task = await taskService.create({
      title: "new task",
      description: "a new task",
      userId: 1,
    });
    const createdTask = (await taskRepository.findById(task.id)) as Task;
    expect(createdTask.title).toEqual("new task");
    expect(createdTask.description).toEqual("a new task");
  });

  it("should not create a new task without an user", async () => {
    await expect(
      taskService.create({
        title: "a new task",
        description: "a new task without an user",
        userId: 0,
      })
    ).rejects.toThrow("user is required");
  });

  it("should list tasks for a user", async () => {
    await taskRepository.create({
      title: "task 1",
      description: "this is task 1",
      userId: 1,
    });
    await taskRepository.create({
      title: "task 2",
      description: "this is task 2",
      userId: 1,
    });
    const tasks = await taskService.list(1);
    expect(tasks.length).toEqual(2);
  });

  it("should not list tasks if no user", async () => {
    await expect(taskService.list(0)).rejects.toThrow("user is required");
  });

  it("should view a task", async () => {
    const task = await taskRepository.create({
      title: "task 2",
      description: "this is task 2",
      userId: 1,
    });
    const taskViewed = await taskService.view({
      taskId: task.id,
      userId: 1,
    });
    expect(taskViewed).toStrictEqual(task);
  });

  it("should not view a task that does not exist", async () => {
    await expect(
      taskService.view({
        taskId: "inexistent-id",
        userId: 1,
      })
    ).rejects.toThrow("task not found");
  });

  it("should not view a task that user is not authorized to view", async () => {
    const task = await taskRepository.create({
      title: "task 2",
      description: "this is task 2",
      userId: 1,
    });
    await expect(
      taskService.view({
        taskId: task.id,
        userId: 2,
      })
    ).rejects.toThrow("not authorized");
  });

  it("should change status of a task", async () => {
    const task = await taskRepository.create({
      title: "task 1",
      description: "this is task 1",
      userId: 1,
    });
    const archivedTask = await taskService.changeStatus({
      taskId: task.id,
      userId: 1,
      newStatus: Status.ARCHIVED,
    });
    expect(archivedTask.status).toEqual(Status.ARCHIVED);
  });

  it("should not change a status of an inexistent task", async () => {
    await expect(
      taskService.changeStatus({
        taskId: "inexistentId",
        newStatus: Status.ARCHIVED,
        userId: 1,
      })
    ).rejects.toThrow("task does not exist");
  });

  it("should not change status with user is not authorized", async () => {
    const task = await taskRepository.create({
      title: "task 1",
      description: "this is task 1",
      userId: 1,
    });
    await expect(
      taskService.changeStatus({
        taskId: task.id,
        newStatus: Status.DONE,
        userId: 2,
      })
    ).rejects.toThrow("not authorized");
  });
});
