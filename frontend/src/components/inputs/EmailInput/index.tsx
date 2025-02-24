import { InputHTMLAttributes } from 'react'

import Input from '@/components/inputs/Input'

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function EmailInput({ label = 'Email', ...rest }: EmailInputProps) {
  return (
    <Input
      label={label}
      type="email"
      {...rest}
    />
  )
}
