import { TaskTable } from "@/components/tasks/TaskTable";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Manager</h1>
            <p className="text-gray-600 text-lg">Organize and track your tasks efficiently</p>
          </div>
          <TaskTable />
        </div>
      </div>
    </div>
  );
}
