"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "./db";
import { Column } from "./column-model";


// CREATE
export async function createColumn(formData: FormData) {
  await dbConnect();

  const title = formData.get("title") as string;
  const position = Number(formData.get("position"));

  if (!title || isNaN(position)) {
    throw new Error("Invalid input");
  }

  await Column.create({ title, position });

  revalidatePath("/"); // reload home page
}

// GET ALL
export async function getColumns() {
  await dbConnect();
  const columns = await Column.find().sort({ position: 1 }).lean();
  return JSON.parse(JSON.stringify(columns));
}
