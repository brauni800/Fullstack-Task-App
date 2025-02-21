"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const auth = useAuth();
  const router = useRouter();

  // Redirect if the user is not authenticated
  if (!auth?.user) {
    router.push("/login");
    return <p>Redirecting...</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome, {auth.user.username}!</h1>
      <p>This is your dashboard where you can manage your tasks.</p>

      <div style={{ marginTop: "20px" }}>
        <Link href='/tasks'>
          <button
            style={{ margin: "10px", padding: "10px 20px", cursor: "pointer" }}>
            Manage Tasks
          </button>
        </Link>
        <button
          onClick={auth.logout}
          style={{
            margin: "10px",
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "red",
          }}>
          Logout
        </button>
      </div>
    </div>
  );
}
