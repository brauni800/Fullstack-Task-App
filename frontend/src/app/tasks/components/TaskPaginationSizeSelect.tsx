'use client'
import { ReactEventHandler } from "react"

import { DEFAULT_PAGINATION_PAGE, DEFAULT_PAGINATION_SIZE } from "@/app/tasks/lib/constants"
import { useTaskStore } from "@/stores/taskStore"

const options = [DEFAULT_PAGINATION_SIZE, 25, 50]

export default function TaskPaginationSizeSelect() {
  const setPage = useTaskStore((state) => state.setPage)
  const setSize = useTaskStore((state) => state.setSize)
  const size = useTaskStore((state) => state.size)

  const handleSelect: ReactEventHandler<HTMLSelectElement> = (event) => {
    setSize(Number(event.currentTarget.value))
    setPage(DEFAULT_PAGINATION_PAGE)
  }

  return (
    <select name="size" value={size} onChange={handleSelect}>
      {options.map((opt) => (
        <option value={opt} key={opt}>{opt}</option>
      ))}
    </select>
  )
}
