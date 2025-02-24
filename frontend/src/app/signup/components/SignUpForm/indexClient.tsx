'use client'
import React, { FormEventHandler, useReducer } from 'react'
import Link from 'next/link'

import { FormState, ReducerAction, ReducerActionKind } from '@/app/signup/lib/types'
import PasswordInput from '@/components/inputs/PasswordInput'
import EmailInput from '@/components/inputs/EmailInput'
import styles from "./SignUpForm.module.css";
import Input from '@/components/inputs/Input'

const reducer = (state: FormState, { type, payload }: ReducerAction): FormState => {
  switch (type) {
    case ReducerActionKind.CHANGE_USERNAME:
      return { ...state, username: payload }
    case ReducerActionKind.CHANGE_PASSWORD:
      return { ...state, password: payload }
    case ReducerActionKind.CHANGE_EMAIL:
      return { ...state, email: payload }
    default:
      return state
  }
}

const initialFormState: FormState = {
  username: '',
  password: '',
  email: ''
}

export default function SignUpForm() {
  const [formState, dispatch] = useReducer(reducer, initialFormState)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
  }
  const handleUsernameChange: FormEventHandler<HTMLInputElement> = (event) => {
    dispatch({ type: ReducerActionKind.CHANGE_USERNAME, payload: event.currentTarget.value })
  }
  const handlePasswordChange: FormEventHandler<HTMLInputElement> = (event) => {
    dispatch({ type: ReducerActionKind.CHANGE_PASSWORD, payload: event.currentTarget.value })
  }
  const handleEmailChange: FormEventHandler<HTMLInputElement> = (event) => {
    dispatch({ type: ReducerActionKind.CHANGE_EMAIL, payload: event.currentTarget.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className={styles.inputsContainer}>
        <Input
          onChange={handleUsernameChange}
          value={formState.username}
          label='Username'
        />
        <EmailInput
          onChange={handleEmailChange}
          value={formState.email}
        />
        <PasswordInput
          onChange={handlePasswordChange}
          value={formState.password}
        />
      </section>
      <footer>
        <button type='submit'>Register</button>
        <Link href='/login'>Back to log in</Link>
      </footer>
    </form>
  )
}
