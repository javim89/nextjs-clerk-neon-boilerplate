"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TaskForm } from "./TaskForm"
import { TaskDetails } from "./TaskDetails"
import { DeleteTaskDialog } from "./DeleteTaskDialog"

export type Task = {
  id: string
  userId: string
  task: string
  createdAt: string
  updatedAt: string
}

export function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [formMode, setFormMode] = useState<"add" | "edit">("add")

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const searchParams = new URLSearchParams()
      if (searchTerm) {
        searchParams.set('search', searchTerm)
      }
      
      const response = await fetch(`/api/tasks?${searchParams}`)
      if (response.ok) {
        const data = await response.json()
        setTasks(data.tasks || [])
      } else {
        console.error('Failed to fetch tasks')
        setTasks([])
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTasks()
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [searchTerm]) // eslint-disable-line react-hooks/exhaustive-deps

  const filteredTasks = tasks

  const handleAddTask = () => {
    setFormMode("add")
    setSelectedTask(null)
    setIsFormOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setFormMode("edit")
    setSelectedTask(task)
    setIsFormOpen(true)
  }

  const handleViewTask = (task: Task) => {
    setSelectedTask(task)
    setIsDetailsOpen(true)
  }

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(task)
    setIsDeleteOpen(true)
  }

  const onTaskDeleted = () => {
    fetchTasks()
  }

  const onTaskSaved = () => {
    fetchTasks()
  }

  

  return (
    <>
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search your tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-white/80 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500/20 shadow-sm rounded-xl text-gray-900 placeholder-gray-500 backdrop-blur-sm"
                />
              </div>
              <Button 
                onClick={handleAddTask} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-medium h-12"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Task
              </Button>
            </div>
          </div>

          <div className="p-8">
            <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b border-gray-100">
                    <TableHead className="font-semibold text-gray-700 py-5 text-base">Tasks</TableHead>
                    <TableHead className="text-right font-semibold text-gray-700 py-5 text-base">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-16">
                        <div className="flex flex-col items-center justify-center space-y-3 text-gray-500">
                          <div className="w-8 h-8 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                          <span className="text-base font-medium">Loading your tasks...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-16">
                        <div className="text-gray-500">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📝</span>
                          </div>
                          <p className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</p>
                          <p className="text-gray-500 mb-4">Create your first task to get started on your productivity journey!</p>
                          <Button 
                            onClick={handleAddTask}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create First Task
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTasks.map((task, index) => (
                      <TableRow key={task.id} className="hover:bg-blue-50/30 transition-all duration-200 border-b border-gray-50 group">
                        <TableCell className="py-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"></div>
                            <div className="flex-1">
                              <span className="font-semibold text-gray-900 text-base leading-relaxed">{task.task}</span>
                              <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
                                <span>Created {new Date(task.createdAt).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>Task #{index + 1}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-6">
                          <div className="flex items-center justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewTask(task)}
                              className="h-8 w-8 p-0 hover:bg-blue-50 rounded-lg cursor-pointer active:scale-95 active:shadow-inner transition-all duration-150"
                            >
                              <Eye className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditTask(task)}
                              className="h-8 w-8 p-0 hover:bg-green-50 rounded-lg cursor-pointer active:scale-95 active:shadow-inner transition-all duration-150"
                            >
                              <Edit className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteTask(task)}
                              className="h-8 w-8 p-0 hover:bg-red-50 rounded-lg cursor-pointer active:scale-95 active:shadow-inner transition-all duration-150"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        task={selectedTask}
        mode={formMode}
        onTaskSaved={onTaskSaved}
      />

      <TaskDetails
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        task={selectedTask}
      />

      <DeleteTaskDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        task={selectedTask}
        onTaskDeleted={onTaskDeleted}
      />
    </>
  )
}