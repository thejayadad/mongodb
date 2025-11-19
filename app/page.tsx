import { createColumn, getColumns } from "@/lib/column-action";

export default async function Home() {
  const columns = await getColumns();

  return (
    <div className="max-w-lg mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Columns</h1>

      {/* CREATE COLUMN FORM */}
      <form action={createColumn} className="space-y-3 p-4 border rounded">
        <input
          name="title"
          placeholder="Column title"
          className="border p-2 w-full rounded"
          required
        />

        <input
          name="position"
          type="number"
          placeholder="Position"
          className="border p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Column
        </button>
      </form>

      {/* COLUMN LIST */}
      <div className="space-y-2">
        {columns.map((col: any) => (
          <div
            key={col._id}
            className="border p-3 rounded flex justify-between"
          >
            <span>{col.title}</span>
            <span className="text-gray-500">{col.position}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
