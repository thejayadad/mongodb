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
  // Better Auth session (server-side)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const { columns, tasks } = await getBoard();

  function tasksForColumn(columnId: string) {
    return tasks.filter((t: any) => t.column === columnId);
  }

  return (
    <div className="h-full" style={{ backgroundColor: "#FAFAFA" }}>
      {user ? (
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "4px",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Header with user info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            marginBottom: "8px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "4px",
                  color: "#111111",
                }}
              >
                BoardFlow
              </h1>
              <p
                style={{
                  fontSize: "13px",
                  color: "#6B6B6B",
                }}
              >
                Organize your work in simple columns.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "13px",
                color: "#6B6B6B",
              }}
            >

            </div>
          </div>

          {/* Board grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
              width: "100%",
              flex: 1,
            }}
          >
            {/* Existing columns */}
            {columns.map((col: any) => (
              <div
                key={col._id}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E5E5", // neutral-200 equivalent
                  borderRadius: "10px",
                  height: "380px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Column title */}
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "8px",
                    color: "#111111",
                  }}
                >
                  {col.title}
                </h3>

                {/* Tasks list */}
                <div style={{ flex: 1, overflowY: "auto" }}>
                  {tasksForColumn(col._id).length === 0 && (
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#A3A3A3",
                      }}
                    >
                      No tasks yet
                    </p>
                  )}

                  {tasksForColumn(col._id).map((task: any) => (
                    <div
                      key={task._id}
                      style={{
                        padding: "8px 10px",
                        border: "1px solid #E5E5E5",
                        borderRadius: "6px",
                        marginBottom: "6px",
                        fontSize: "13px",
                        color: "#111111",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* New column card – server action form */}
            <form
              action={createColumn}
              style={{
                height: "380px",
                backgroundColor: "#FFFFFF",
                border: "2px dashed #E5E5E5",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Default title + position */}
              <input type="hidden" name="title" value="New Column" />
              <input
                type="hidden"
                name="position"
                value={columns.length + 1}
              />

              <button
                type="submit"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#6B6B6B",
                }}
              >
                + Add Column
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Logged-out marketing view
        <div
          className="w-full h-full"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            style={{
              maxWidth: "480px",
              textAlign: "center",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E5E5",
              borderRadius: "16px",
              padding: "24px 20px",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                marginBottom: "8px",
                color: "#111111",
              }}
            >
              Welcome to BoardFlow
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#6B6B6B",
                marginBottom: "16px",
              }}
            >
              Sign in to create boards, add tasks, and keep your day organized
              in a simple kanban view.
            </p>

            <SignInWithGoogleButton />
          </div>
        </div>
      )}
    </div>
  );
}
