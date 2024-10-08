'use client'

import { ButtonGroup } from '@/components/form/button-group'
import { Modal } from '../modal'
import { Button } from '@/components/form/button'
import { Input } from '@/components/form/input'
import { useForm } from 'react-hook-form'
import { createUser } from '@/actions/users/create-user-action'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserSchema } from '@/schemas/users/create-user-schema'
import { CreateUserData } from '@/types/users/create-user'
import { toast } from 'react-toastify'
import { Status } from '@/constants/status'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export const CreateUserModal = () => {
  const pathname = usePathname()
  const params = useSearchParams()
  const router = useRouter()
  const isOpen = params.has('create_user')

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  const handleCloseModal = () => router.push(pathname)

  const onSubmit = handleSubmit(async (data) => {
    const { Success } = Status
    const response = await createUser(data)

    if (response.status !== Success) {
      return toast(response.message, {
        type: 'error',
      })
    }

    toast(response.message, {
      type: 'success',
    })
    handleCloseModal()
    reset()
  })

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Criar Usuário</Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Content>
          <div className="flex gap-3 flex-col">
            <Input
              label="Nome"
              name="name"
              register={register}
              error={errors?.name?.message}
            />
            <Input
              label="Usuário"
              name="username"
              register={register}
              error={errors?.username?.message}
            />
            <Input
              label="Senha"
              name="password"
              register={register}
              type="password"
              error={errors?.password?.message}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button type="button" onClick={handleCloseModal} variant="danger">
              Fechar
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              Cadastrar
            </Button>
          </ButtonGroup>
        </Modal.Actions>
      </form>
    </Modal.Root>
  )
}
