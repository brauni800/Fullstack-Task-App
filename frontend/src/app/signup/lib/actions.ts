'use server'
import { AxiosError } from "axios"
import { CreateUsersResponse, Notification } from "./types"
import { serverAPI } from "@/services/api"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function createUser(notification: Notification | null, formData: FormData): Promise<Notification> {
  const username = formData.get('username')
  const password = formData.get('password')
  const email = formData.get('email')

  try {
    await serverAPI.post<CreateUsersResponse>('/users/', { username, password, email })

    const cookieStore = await cookies()
    cookieStore.set('notification', JSON.stringify({
      message: 'You were signed up!',
      success: true
    }), { maxAge: 5 })
  } catch (error) {
    if (error instanceof AxiosError) {
      return { message: error.response?.data?.detail, success: false }
    }
    console.error({error});    
    return { message: 'Error, something was wrong!', success: false }
  }
  redirect('/login')
}
