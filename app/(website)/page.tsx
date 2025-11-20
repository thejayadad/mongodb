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
            padding: "2px",
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
                  border: "1px dotted #E5E5E5", // neutral-200 equivalent
                  borderRadius: "10px",
                  height: "380px",
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Column header: rename + delete */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  {/* Update column title */}
                  <form
                    action={updateColumn}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flex: 1,
                    }}
                  >
                    <input type="hidden" name="id" value={col._id} />
                    <input
                      type="hidden"
                      name="position"
                      value={col.position ?? 0}
                    />
                    <input
                      name="title"
                      defaultValue={col.title}
                      style={{
                        flex: 1,
                        fontSize: "13px",
                        padding: "6px 8px",
                        borderRadius: "6px",
                        border: "1px solid #E5E5E5",
                        outline: "none",
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        border: "none",
                        backgroundColor: "#111111",
                        color: "#FFFFFF",
                        fontSize: "11px",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Save
                    </button>
                  </form>

                  {/* Delete column */}
                  <form action={deleteColumn}>
                    <input type="hidden" name="id" value={col._id} />
                    <button
                      type="submit"
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#B91C1C", // red-ish
                        fontSize: "11px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Delete
                    </button>
                  </form>
                </div>

                {/* Tasks list */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    marginBottom: "8px",
                  }}
                >
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
                        width: 'full',
                        backgroundColor: "#FFFFFF",
                        display: "flex",
                        gap: "4px",
                      }}
                    >
                      {/* Update task name */}
                      <form
                        action={updateTask}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          width: "full"
                        }}
                      >
                        <input type="hidden" name="id" value={task._id} />
                        <input
                          name="title"
                          defaultValue={task.title}
                          style={{
                            flex: 1,
                            fontSize: "13px",
                            padding: "6px 8px",
                            borderRadius: "6px",
                            border: "1px solid #E5E5E5",
                            outline: "none",
                          }}
                        />
                        <button
                          type="submit"
                          style={{
                            border: "none",
                            backgroundColor: "#111111",
                            color: "#FFFFFF",
                            fontSize: "11px",
                            padding: "6px 8px",
                            borderRadius: "999px",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Save
                        </button>
                      </form>

                      {/* Delete task */}
                      <form
                        action={deleteTask}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <input type="hidden" name="id" value={task._id} />
                        <button
                          type="submit"
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "#B91C1C",
                            fontSize: "11px",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  ))}
                </div>

                {/* Add task form at bottom of column */}
                <form
                  action={createTask}
                  style={{
                    borderTop: "1px solid #E5E5E5",
                    paddingTop: "8px",
                    marginTop: "4px",
                    display: "flex",
                    gap: "6px",
                  }}
                >
                  <input type="hidden" name="columnId" value={col._id} />
                  <input
                    name="title"
                    placeholder="Add a task..."
                    style={{
                      width: "100%",
                      fontSize: "13px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      border: "1px solid #E5E5E5",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      alignSelf: "flex-end",
                      border: "none",
                      backgroundColor: "#111111",
                      color: "#FFFFFF",
                      fontSize: "10px",
                      padding: "3px 5px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Add task
                  </button>
                </form>
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
