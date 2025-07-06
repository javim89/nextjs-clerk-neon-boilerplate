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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
            Task Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Task Description</h3>
            <p className="text-gray-900 text-lg leading-relaxed">{task.task}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-1">Created</h4>
              <p className="text-blue-700">{new Date(task.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-1">Last Updated</h4>
              <p className="text-green-700">{new Date(task.updatedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-1">Task ID</h4>
            <p className="text-gray-600 font-mono text-sm">{task.id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}