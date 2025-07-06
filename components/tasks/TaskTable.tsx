"use client"

import { useState, useEffect } from "react"
import { Plus, Search, MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTasks()
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

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
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 bg-white border-gray-200 focus:bg-white focus:outline-none focus:border-transparent focus:shadow-md transition-all duration-200 text-gray-900 placeholder-gray-500 hover:border-gray-300"
              />
            </div>
            <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add New Task
            </Button>
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="font-semibold text-gray-700 py-4">Task</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700 py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-12">
                      <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                        <span>Loading tasks...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-12">
                      <div className="text-gray-500">
                        <div className="text-4xl mb-2">📝</div>
                        <p className="text-lg font-medium">No tasks found</p>
                        <p className="text-sm text-gray-400 mt-1">Create your first task to get started!</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-medium text-gray-900">{task.task}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Created: {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full opacity-100">
                              <MoreHorizontal className="h-4 w-4 text-gray-600" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-lg">
                            <DropdownMenuItem onClick={() => handleViewTask(task)} className="cursor-pointer hover:bg-gray-50 text-gray-700">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditTask(task)} className="cursor-pointer hover:bg-gray-50 text-gray-700">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteTask(task)}
                              className="text-red-600 cursor-pointer hover:bg-red-50"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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