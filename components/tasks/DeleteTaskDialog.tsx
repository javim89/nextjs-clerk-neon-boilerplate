"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Task } from "./TaskTable"

interface DeleteTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task | null
  onTaskDeleted?: () => void
}

export function DeleteTaskDialog({ open, onOpenChange, task, onTaskDeleted }: DeleteTaskDialogProps) {
  if (!task) return null

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onOpenChange(false)
        onTaskDeleted?.()
      } else {
        const error = await response.json()
        console.error("Error deleting task:", error)
        alert("Failed to delete task. Please try again.")
      }
    } catch (error) {
      console.error("Error deleting task:", error)
      alert("Failed to delete task. Please try again.")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900">Delete Task</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p className="text-gray-900">
              Are you sure you want to delete the task{" "}
              <span className="font-semibold">
                "{task.task}"
              </span>
              ?
            </p>
            <p className="text-sm text-gray-900">
              This action cannot be undone. The task will be permanently removed from the system.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Delete Task
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}