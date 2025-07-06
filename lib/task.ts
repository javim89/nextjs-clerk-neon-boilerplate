import prisma from './prisma'
import { Task } from '@prisma/client'

export type { Task }

export async function getAllTasks(): Promise<Task[]> {
  return await prisma.task.findMany({
    where: {
      deletedAt: null
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getTaskById(id: string): Promise<Task | null> {
  return await prisma.task.findUnique({
    where: {
      id
    },
  })
}


export async function createTask(data: {
  userId: string
  task: string
}): Promise<Task> {
  return await prisma.task.create({
    data: {
      userId: data.userId,
      task: data.task,
    }
  })
}

export async function updateTask(
  id: string,
  data: Partial<Omit<Task, 'id' | 'taskId' | 'createdAt' | 'updatedAt' | 'deletedAt'>>
): Promise<Task | null> {
  if (Object.keys(data).length === 0) {
    return getTaskById(id)
  }
  
  return await prisma.task.update({
    where: {
      id,
      deletedAt: null
    },
    data: {
      ...data,
      updatedAt: new Date()
    }
  })
}

export async function deleteTask(id: string): Promise<Task | null> {
  return await prisma.task.update({
    where: {
      id,
      deletedAt: null
    },
    data: {
      deletedAt: new Date()
    }
  })
}


