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
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Button onClick={handleAddTask}>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading tasks...
                    </TableCell>
                  </TableRow>
                ) : filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No tasks found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">
                        {task.task}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewTask(task)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditTask(task)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteTask(task)}
                              className="text-red-600"
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