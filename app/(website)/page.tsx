// app/page.tsx
import {
  createColumn,
  createTask,
  getBoard,
  updateColumn,
  deleteColumn,
  updateTask,
  deleteTask,
} from "@/lib/column-action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  SignInWithGoogleButton,
  SignOutButton,
} from "../_components/google-btn";

export default async function Home() {
  // Get the Better Auth session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const { columns, tasks } = await getBoard();

  function tasksForColumn(columnId: string) {
    return tasks.filter((t: any) => t.column === columnId);
  }

  return (
    <div>
      { user ? (
        <div className="w-full h-full">
          User Info
        </div>
      ):(
       <div className="w-full h-full">
          Marketing PAge
        </div>
      )}
    </div>
  );
}
