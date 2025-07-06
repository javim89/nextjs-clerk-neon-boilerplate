import { NextRequest, NextResponse } from "next/server";
// import { auth, clerkClient } from '@clerk/nextjs/server'
import { getAllTasks, createTask } from "@/lib/task";

export async function GET(request: NextRequest) {
  try {
    // const { userId } = await auth()

    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    // For now, get all tasks. In production, you'd want to implement pagination and search at the Prisma level
    const allTasks = await getAllTasks();

    let filteredTasks = allTasks;

    if (search) {
      filteredTasks = allTasks.filter((task) =>
        task.task.toLowerCase().includes(search.toLowerCase())
      );
    }

    const total = filteredTasks.length;
    const tasks = filteredTasks.slice(offset, offset + limit);

    return NextResponse.json({
      tasks,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // const { userId } = await auth();

    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body = await request.json();
    const {
      task
    } = body;

    if (!task) {
      return NextResponse.json(
        { error: "task is required" },
        { status: 400 }
      );
    }

    // Generate a unique userId for the task (they don't have a Clerk account yet)
    const taskUserId = `task_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const result = await createTask({
      userId: taskUserId,
      task,
      
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      {
        error: "Failed to create task",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
