'use client'
import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const auth = useAuth();  
  return (
    <button onClick={auth?.logout}>Logout</button>
  )
}
