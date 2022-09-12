import { Status } from "../enums/status";
import crypto from "crypto";

export class Task {
  constructor(title: string, description: string, userId: number) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.status = Status.TODO;
    this.userId = userId;
  }

  id: string;

  title: string;

  description: string;

  status: Status;

  userId: number;

  public archive() {
    this.status = Status.ARCHIVED;
  }

  public moveTo(status: Status) {
    this.status = status;
  }
}
