import express from "express";
import { Status } from "./enums/status";
import { InMemoryTaskRepository } from "./repositories/implementation/InMemoryTaskRepository";
import { TaskService } from "./services/TaskService";

const app = express();

app.use(express.json());

const taskService = new TaskService(new InMemoryTaskRepository());

// create a new task
app.post("/task", async (req, res) => {
  const { title, description } = req.body;
  const userId = Number(req.headers.user);
  const task = await taskService.create({
    userId,
    title,
    description,
  });
  return res.json(task);
});

// view task
app.get("/task/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const userId = Number(req.headers.user);
  const task = await taskService.view({ taskId, userId });
  return res.json(task);
});

// change task status
app.put("/task/:taskId/move_to/:status", async (req, res) => {
  const { taskId } = req.params;
  const status = req.params.status as "IN_PROGRESS" | "DONE";
  const userId = Number(req.headers.user);
  const task = await taskService.changeStatus({
    userId,
    taskId,
    newStatus: Status[status],
  });
  return res.json(task);
});

// archive task
app.patch("/task/:taskId/archive", async (req, res) => {
  const userId = Number(req.headers.user);
  const { taskId } = req.params;
  const task = await taskService.changeStatus({
    taskId,
    userId,
    newStatus: Status.ARCHIVED,
  });
  return res.json(task);
});

// list tasks
app.get("/tasks", async (req, res) => {
  const userId = Number(req.headers.user);
  const tasks = await taskService.list(+userId);
  return res.json(tasks);
});

// start server
app.listen(3000, () => console.log("server running on port 3000"));
