"use server";
import { revalidatePath } from "next/cache";

import { ref, update } from "firebase/database";

import { db } from "@/lib/firebase/firebaseInit";
// formData  = formData object name/value pairs from the form
export async function editAction(prevState, formData) {
  const task_name = formData.get("task");
  const category = formData.get("category");
  const uid = formData.get("uid");
  const newTask = {
    task_name,
    category
  };

  const response = await editTask(newTask, uid);
  revalidatePath("/demo");

  // call edit task
  return { message: response };
}

// Firebase NoSql SQL ....
async function editTask(task, uid) {
  const path = `todos/${uid}`;
  const dbRef = ref(db, path);

  console.log(dbRef);

  try {
    await update(dbRef, task);
    return "success";
  } catch (error) {
    return "failure";
  }
}
