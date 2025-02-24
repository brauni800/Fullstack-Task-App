import { HTMLAttributes } from "react"

import styles from "./Spinner.module.css"

type SpinnerSize = 'sm' | 'md' | 'lg'

interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
}

export default function Spinner({ className, size = 'md', ...rest }: SpinnerProps) {
  return (
    <span
      className={[
        styles.loader,
        styles[size],
        className
      ].join(' ').trim()}
      {...rest}
    />
  )
}
