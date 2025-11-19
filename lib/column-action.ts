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

// UPDATE COLUMN
export async function updateColumn(formData: FormData) {
  await dbConnect();

  const id = formData.get("id") as string;
  const title = (formData.get("title") as string)?.trim();
  const position = Number(formData.get("position"));

  if (!id || !title || isNaN(position)) {
    throw new Error("Invalid update input");
  }

  await Column.findByIdAndUpdate(id, { title, position });

  revalidatePath("/");
}

// DELETE COLUMN (and its tasks)
export async function deleteColumn(formData: FormData) {
  await dbConnect();

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Column id is required");
  }

  // Remove the column
  await Column.findByIdAndDelete(id);

  // Clean up tasks belonging to this column
  await Task.deleteMany({ column: id });

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

  return {
    columns: JSON.parse(JSON.stringify(columns)),
    tasks: JSON.parse(JSON.stringify(tasks)),
  };
}
