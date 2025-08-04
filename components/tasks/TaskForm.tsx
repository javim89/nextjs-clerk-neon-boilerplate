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
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
            {mode === "add" ? "Add New Task" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task" className="text-sm font-medium text-gray-700">
                Task Description *
              </Label>
              <Input
                id="task"
                value={formData.task}
                onChange={(e) => handleInputChange("task", e.target.value)}
                required
                placeholder="Enter your task description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-transparent focus:shadow-md transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 hover:border-gray-400"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors bg-white cursor-pointer active:scale-95 active:shadow-inner transition-all duration-150"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer active:scale-95 active:shadow-inner transition-all duration-150"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                mode === "add" ? "Add Task" : "Update Task"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}