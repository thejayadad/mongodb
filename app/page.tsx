// app/page.tsx

import { createColumn, createTask, getBoard } from "@/lib/column-action";

export default async function Home() {
  const { columns, tasks } = await getBoard();

  function tasksForColumn(columnId: string) {
    return tasks.filter((t: any) => t.column === columnId);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-bold">Board</h1>

      {/* CREATE COLUMN */}
      <section className="p-4 border rounded space-y-3">
        <h2 className="font-semibold">Add Column</h2>
        <form action={createColumn} className="flex gap-2 flex-wrap">
          <input
            name="title"
            placeholder="Column title"
            className="border p-2 rounded flex-1 min-w-[150px]"
            required
          />
          <input
            name="position"
            type="number"
            placeholder="Position"
            className="border p-2 rounded w-28"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </form>
      </section>

      {/* COLUMNS + TASKS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col: any) => (
          <div key={col._id} className="border rounded p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{col.title}</h2>
              <span className="text-xs text-gray-500">
                pos {col.position}
              </span>
            </div>

            {/* TASK LIST */}
            <div className="space-y-1">
              {tasksForColumn(col._id).map((task: any) => (
                <div
                  key={task._id}
                  className="border rounded px-2 py-1 text-sm bg-gray-50"
                >
                  {task.title}
                </div>
              ))}

              {tasksForColumn(col._id).length === 0 && (
                <p className="text-xs text-gray-400">No tasks yet</p>
              )}
            </div>

            {/* ADD TASK TO THIS COLUMN */}
            <form action={createTask} className="space-y-2">
              <input type="hidden" name="columnId" value={col._id} />
              <input
                name="title"
                placeholder="New task..."
                className="border p-2 rounded w-full text-sm"
                required
              />
              <button
                type="submit"
                className="w-full bg-black text-white text-sm py-1.5 rounded"
              >
                Add Task
              </button>
            </form>
          </div>
        ))}
      </section>
    </div>
  );
}
