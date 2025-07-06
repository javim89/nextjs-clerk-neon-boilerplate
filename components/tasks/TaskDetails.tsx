"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Task } from "./TaskTable"

interface TaskDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task | null
}

export function TaskDetails({ open, onOpenChange, task }: TaskDetailsProps) {
  if (!task) return null

  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {task.task}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}