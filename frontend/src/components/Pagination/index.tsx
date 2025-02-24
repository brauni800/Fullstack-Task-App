'use client'
import ReactPaginate, { ReactPaginateProps } from "react-paginate"
import "./Pagination.css"

export default function Pagination({ ...rest }: ReactPaginateProps) {
  return (
    <ReactPaginate
      className="pagination-container"
      {...rest}
    />
  )
}
