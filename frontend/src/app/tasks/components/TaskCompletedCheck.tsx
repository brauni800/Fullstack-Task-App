'use client'
import { useTaskStore } from "@/stores/taskStore"
import { ChangeEventHandler } from "react"

import { DEFAULT_PAGINATION_PAGE } from "@/app/tasks/lib/constants"

export default function TaskCompletedCheck() {
  const setIsCompleted = useTaskStore((state) => state.setIsCompleted)
  const isCompleted = useTaskStore((state) => state.isCompleted)
  const setPage = useTaskStore((state) => state.setPage)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsCompleted(event.currentTarget.checked)
    setPage(DEFAULT_PAGINATION_PAGE)
  }

  return (
    <label>
      <input
        type="checkbox"
        name="completed"
        checked={Boolean(isCompleted)}
        onChange={handleChange}
      />
      <span>Completed</span>
    </label>
  )
}
