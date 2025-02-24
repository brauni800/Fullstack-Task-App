'use client'
import useSWR from "swr"

import { DEFAULT_PAGINATION_PAGE, DEFAULT_PAGINATION_SIZE } from "./constants"
import { Task, UseTasksProps } from "./interfaces"
import { PaginatedResponse } from "@/lib/interfaces"

export const useTasks = ({
  page = DEFAULT_PAGINATION_PAGE,
  size = DEFAULT_PAGINATION_SIZE,
  isCompleted,
  priority,
}: UseTasksProps = {}) => {
  const search = new URLSearchParams()
  search.append('page', String(page))
  search.append('size', String(size))
  if (priority !== undefined) search.append('priority', String(priority))
  if (isCompleted !== undefined) search.append('completed', String(isCompleted))

  const { data, isLoading, mutate } = useSWR<PaginatedResponse<Task>>(
    `/tasks/${search.size ? '?' + search.toString() : ''}`
  )

  return {
    tasks: data?.items ?? [],
    isLoading,
    mutate,
    data
  }
}
