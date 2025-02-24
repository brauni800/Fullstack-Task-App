'use client'
import { ReactEventHandler } from "react"

import { DEFAULT_PAGINATION_PAGE, TASK_PRIORITIES } from "@/app/tasks/lib/constants"
import { useTaskStore } from "@/stores/taskStore"

export default function TaskPrioritySelect() {
  const setPriority = useTaskStore((state) => state.setPriority)
  const setPage = useTaskStore((state) => state.setPage)

  const handleSelect: ReactEventHandler<HTMLSelectElement> = (event) => {
    const selectedPriority = Number(event.currentTarget.value)
    setPage(DEFAULT_PAGINATION_PAGE)
    setPriority(selectedPriority)
  }

  return (
    <select name="priority" onChange={handleSelect}>
      <option value={-1}>Seleccionar prioridad</option>
      <option value={TASK_PRIORITIES.HIGH}>High</option>
      <option value={TASK_PRIORITIES.MEDIUM}>Medium</option>
      <option value={TASK_PRIORITIES.LOW}>Low</option>
    </select>
  )
}
