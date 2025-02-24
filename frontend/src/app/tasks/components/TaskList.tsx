'use client'
import { useTaskStore } from "@/stores/taskStore"
import { useTasks } from "@/app/tasks/lib/hooks"
import Pagination from "@/components/Pagination"
import Spinner from "@/components/Spinner"

export default function TaskList() {
  const isCompleted = useTaskStore((state) => state.isCompleted)
  const priority = useTaskStore((state) => state.priority)
  const setPage = useTaskStore((state) => state.setPage)
  const size = useTaskStore((state) => state.size)
  const page = useTaskStore((state) => state.page)

  const { tasks, isLoading, data } = useTasks({
    priority: priority !== -1 ? priority : undefined,
    isCompleted,
    page,
    size
  })

  const handlePaginationChanged = ({ selected }: { selected: number }) => {
    setPage(selected + 1)
  }

  return (
    <>
      {isLoading && <div style={{ display: 'grid', placeContent: 'center' }}>
        <Spinner />
      </div>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "✅" : "❌"} - {task.priority}
          </li>
        ))}
      </ul>
      <Pagination
        pageCount={data?.total_pages ?? 1}
        onPageChange={handlePaginationChanged}
        renderOnZeroPageCount={null}
        forcePage={data?.total_pages !== undefined ? page - 1 : undefined}
      />
    </>
  )
}
