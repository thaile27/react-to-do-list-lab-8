"use client";
import { useFormState } from "react-dom";
import { useState } from "react";

import { toast } from "sonner";

import { editAction } from "@/actions/editTaskAction";
import { cn } from "@/lib/utils/mergeCss";
import { FormControl, Input, Label } from ".";

const initialState = {
  message: "default"
};

/*
      Communication between client - server
			 use the useFormState()  hook.
      const anyInitialState = {
        property: value,
        prop:value
      }

			 const [state, formActionToRun] = useFormState(yourServerActionToRun, anyInitialState)
			 <form action={formActionToRun}>

       Client sending to the server
      <form action={yourServerAction}>
*/
function EditTaskForm({ children, className, uid, payload }) {
  // formAction is for server and client communication
  const [state, formAction] = useFormState(editAction, initialState);
  const [category, setCategory] = useState(payload.category);
  const [task, setTask] = useState(payload.task);

  function handleInput(e) {
    switch (e.currentTarget.value) {
      case "category":
        setCategory(e.currentTarget.value);
        break;
      case "task":
        setTask(e.currentTarget.value);
        break;
      default:
        null;
    }
  }

  let stateFontColor = "";

  if (state.message === "success") {
    toast(
      <aside className="bg-green-500 text-lime-50 rounded-lg py-6 text-center">
        <p className="mx-4 font-bold">Your task was updated successfully</p>
      </aside>
    );
    stateFontColor = "text-green-500";
  } else if (state.message === "failure") {
    toast(
      <aside className="bg-red-500 text-lime-50 rounded-lg py-6 text-center">
        <p className="mx-4 font-bold">Your task was not updated successfully</p>
      </aside>
    );
    stateFontColor = "text-red-500";
  }

  return (
    <section>
      <header>
        <h2 className="text-xs font-light">
          Form State:{" "}
          <span className={cn("font-bold", stateFontColor)}>
            {state.message}
          </span>
        </h2>
      </header>
      <form
        action={formAction}
        className={cn("space-y-5  bg-white    py-8 px-4", className)}>
        <FormControl>
          <Input type="hidden" name="uid" value={uid} />
        </FormControl>

        <FormControl className="flex flex-col">
          <Label htmlFor="category">Category</Label>
          <Input
            onInput={handleInput}
            id="category"
            name="category"
            placeholder="enter the task category"
          />
        </FormControl>

        <FormControl className="flex flex-col">
          <Label htmlFor="task">Task</Label>
          <Input
            onInput={handleInput}
            id="task"
            name="task"
            placeholder="enter a new task"
          />
        </FormControl>
        <FormControl className="pt-3">
          <button className="bg-black text-white w-full py-2.5 rounded-lg mt-3 font-semibold">
            Update Task
          </button>
        </FormControl>
      </form>
    </section>
  );
}

export { EditTaskForm };
