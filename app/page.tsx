import { TaskTable } from "@/components/tasks/TaskTable";

export default function Home() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
      </div>
      <TaskTable />
    </div>
  );
}
