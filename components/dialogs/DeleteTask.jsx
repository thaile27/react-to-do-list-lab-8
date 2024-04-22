import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils/mergeCss";
import { DeleteTaskForm } from "../forms/DeleteTaskForm";

function DeleteTask({ children, className, uid, payload }) {
  return (
    <Dialog className="">
      <DialogTrigger className="bg-black text-white w-full px-2.5 py-2.5 rounded-lg mt-3 font-semibold">
        Delete
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <DeleteTaskForm uid={uid} payload={payload} />
      </DialogContent>
    </Dialog>
  );
}

export { DeleteTask };
