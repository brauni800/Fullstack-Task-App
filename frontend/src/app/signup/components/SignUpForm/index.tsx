'use client'
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

import PasswordInput from '@/components/inputs/PasswordInput'
import EmailInput from '@/components/inputs/EmailInput'
import { createUser } from '@/app/signup/lib/actions'
import { Notification } from '@/app/signup/lib/types'
import Input from '@/components/inputs/Input'
import styles from "./SignUpForm.module.css"
import Spinner from '@/components/Spinner'

export default function SignUpForm() {
  const [state, formAction, isLoading] = useActionState<Notification | null, FormData>(createUser, null)

  useEffect(() => {
    if (state && !state.success) toast(state.message, { type: 'error' })
  }, [state])

  return (
    <form action={formAction} className={styles.form}>
      <section className={styles.inputsContainer}>
        <Input
          autoComplete='off'
          label='Username'
          name='username'
          required
        />
        <EmailInput
          autoComplete='off'
          name='email'
          required
        />
        <PasswordInput
          autoComplete='off'
          name='password'
          required
        />
      </section>
      <footer className={styles.footer}>
        <button type='submit'>
          {isLoading && <Spinner className={styles.spinner} size='sm'/>}
          <span>Register</span>
        </button>
        <Link href='/login'>Back to log in</Link>
      </footer>
    </form>
  )
}
