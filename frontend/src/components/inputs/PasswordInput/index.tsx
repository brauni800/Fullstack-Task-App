'use client'
import { ChangeEventHandler, InputHTMLAttributes, useState } from 'react'

import EyeSlash from '@/components/icons/EyeSlash'
import styles from "./PasswordInput.module.css"
import Input from '@/components/inputs/Input'
import Eye from '@/components/icons/Eye'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function PasswordInput({ label = 'Password', ...rest }: PasswordInputProps) {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false)
  const handleIsPasswordShowingChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsPasswordShowing(event.currentTarget.checked)
  }
  return (
    <div className={styles.container}>
      <Input
        label={label}
        type={isPasswordShowing ? 'text' : 'password'}
        className={styles.textInput}
        {...rest}
      />
      <label className={styles.showContainer}>
        <input
          onChange={handleIsPasswordShowingChange}
          checked={isPasswordShowing}
          name='show_password'
          autoComplete='off'
          type="checkbox"
          hidden
        />
        {isPasswordShowing ? <EyeSlash /> : <Eye />}
      </label>
    </div>
  )
}
