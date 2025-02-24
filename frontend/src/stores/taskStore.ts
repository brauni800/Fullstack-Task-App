import { create } from 'zustand'

import { DEFAULT_PAGINATION_PAGE, DEFAULT_PAGINATION_SIZE } from '@/app/tasks/lib/constants'

interface TaskState {
  priority: number
  isCompleted?: boolean
  size: number
  page: number
  setPriority: (priority: number) => void
  setIsCompleted: (completed?: boolean) => void
  setSize: (size: number) => void
  setPage: (page: number) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  priority: -1,
  isCompleted: undefined,
  size: DEFAULT_PAGINATION_SIZE,
  page: DEFAULT_PAGINATION_PAGE,
  setPriority: (priority: number) => set({ priority }),
  setIsCompleted: (isCompleted?: boolean) => set({ isCompleted }),
  setSize: (size: number) => set({ size }),
  setPage: (page: number) => set({ page })
}))
