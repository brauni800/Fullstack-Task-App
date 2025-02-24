import { InputHTMLAttributes } from 'react'

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function Input({ label, ...rest }: InputProps) {
  return (
    <label className={styles.container}>
      <span>{label}</span>
      <input
        {...rest}
      />
    </label>
  )
}
