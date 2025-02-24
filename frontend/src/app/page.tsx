"use client"
import Link from "next/link"

import { useAuth } from "@/context/AuthContext"

export default function Home() {
  const auth = useAuth();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Task Manager</h1>
      <p>
        Organize your tasks efficiently with our simple task management system.
      </p>

      {auth?.user ? (
        <>
          <p>
            Logged in as: <strong>{auth.user.username}</strong>
          </p>
          <Link href='/dashboard'>
            <button
              style={{
                margin: "10px",
                padding: "10px 20px",
                cursor: "pointer",
              }}>
              Go to Dashboard
            </button>
          </Link>
          <button
            onClick={auth.logout}
            style={{ margin: "10px", padding: "10px 20px", cursor: "pointer" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href='/login'>
            <button
              style={{
                margin: "10px",
                padding: "10px 20px",
                cursor: "pointer",
              }}>
              Login
            </button>
          </Link>
          <Link href='/register'>
            <button
              style={{
                margin: "10px",
                padding: "10px 20px",
                cursor: "pointer",
              }}>
              Register
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
