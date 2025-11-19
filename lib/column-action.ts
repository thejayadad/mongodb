// app/actions/column-actions.ts
"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "./db";
import { Column } from "./column-model";
import { Task } from "./task-model";


// CREATE COLUMN
export async function createColumn(formData: FormData) {
  await dbConnect();

  const title = (formData.get("title") as string)?.trim();
  const position = Number(formData.get("position"));

  if (!title || isNaN(position)) {
    throw new Error("Invalid column input");
  }

  await Column.create({ title, position });

  revalidatePath("/");
}

// CREATE TASK (belongs to a column)
export async function createTask(formData: FormData) {
  await dbConnect();

  const title = (formData.get("title") as string)?.trim();
  const columnId = formData.get("columnId") as string;

  if (!title || !columnId) {
    throw new Error("Invalid task input");
  }

  await Task.create({
    title,
    column: columnId,
  });

  revalidatePath("/");
}

// GET BOARD: all columns + tasks
export async function getBoard() {
  await dbConnect();

  const columns = await Column.find().sort({ position: 1 }).lean();
  const tasks = await Task.find().sort({ createdAt: 1 }).lean();

  // serialize for Next.js
  return {
    columns: JSON.parse(JSON.stringify(columns)),
    tasks: JSON.parse(JSON.stringify(tasks)),
  };
}
