import { Status } from "../enums/status";
import { Task } from "./Task";

describe("Task", () => {
  it("should create a task", () => {
    const task = new Task("new job", "this is my new job", 1);
    expect(task).toHaveProperty("id");
    expect(task.title).toEqual("new job");
    expect(task.description).toEqual("this is my new job");
    expect(task.status).toEqual(Status.TODO);
    expect(task.userId).toEqual(1);
  });

  it("should archive a task", () => {
    const task = new Task("Archive this", "this task needs to be archived", 1);
    task.archive();
    expect(task.status).toEqual(Status.ARCHIVED);
  });

  it("should move a task between statuses", () => {
    const task = new Task(
      "Move this task",
      "you need to move this task right now",
      1
    );
    task.moveTo(Status.IN_PROGRESS);
    expect(task.status).toEqual(Status.IN_PROGRESS);
  });
});
