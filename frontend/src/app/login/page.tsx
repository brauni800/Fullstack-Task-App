"use client";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import Link from "next/link"

import PasswordInput from "@/components/inputs/PasswordInput";
import { Notification } from "@/app/signup/lib/types"
import { useAuth } from "@/context/AuthContext"
import Input from "@/components/inputs/Input"
import styles from "./LogIn.module.css"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await auth?.login(username, password);
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  useEffect(() => {
    const notificationCookie = Cookies.get('notification')
    if (notificationCookie) {
      const { message }: Notification = JSON.parse(notificationCookie)
      toast(message, { type: 'success' })
      Cookies.remove('notification')
    }
  }, [])

  return (
    <section className={styles.container}>
      <header>
        <h1>Login</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <section className={styles.inputsContainer}>
          <Input
            autoComplete="username"
            label="Username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            autoComplete="on"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>
        <footer>
          <button type='submit'>Login</button>
          <Link href='/signup'>Go to sign up</Link>
        </footer>
      </form>
    </section>
  );
}
