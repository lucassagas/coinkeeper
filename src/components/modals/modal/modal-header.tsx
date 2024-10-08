import { ReactNode } from 'react'

interface ModalHeaderProps {
  children: ReactNode
}

export const ModalHeader = ({ children }: ModalHeaderProps) => {
  return (
    <header className="w-full bg-primary p-3 text-white">{children}</header>
  )
}
