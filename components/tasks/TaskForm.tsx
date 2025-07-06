"use client"

import { useState, useEffect } from "react"
// import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Task } from "./TaskTable"

interface TaskFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task | null
  mode: "add" | "edit"
  onTaskSaved?: () => void
}

export function TaskForm({ open, onOpenChange, task, mode, onTaskSaved }: TaskFormProps) {
  // const { user } = useUser()

  const [formData, setFormData] = useState({
    task: "",
  })

  useEffect(() => {
    if (mode === "edit" && task) {
      setFormData({
        task: task.task || "",
      })
    } else {
      setFormData({
        task: "",
      })
    }
  }, [mode, task, open])

  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()


    setLoading(true)

    try {
      const url = mode === "add" ? "/api/tasks" : `/api/tasks/${task?.id}`
      const method = mode === "add" ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      })

      if (response.ok) {
        onOpenChange(false)
        onTaskSaved?.()
      } else {
        const error = await response.json()
        console.error("Error saving task:", error)
        alert("Failed to save task. Please try again.")
      }
    } catch (error) {
      console.error("Error saving task:", error)
      alert("Failed to save task. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Task" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="task">Task *</Label>
              <Input
                id="task"
                value={formData.task}
                onChange={(e) => handleInputChange("task", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : mode === "add" ? "Add Task" : "Update Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}