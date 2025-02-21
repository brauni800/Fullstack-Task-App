"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function Tasks() {
  const auth = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await api.get("/tasks/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setTasks(response.data);
    }
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
      <button onClick={auth?.logout}>Logout</button>
    </div>
  );
}
