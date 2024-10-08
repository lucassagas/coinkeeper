import { Button } from '@/components/form/button'
import { ButtonGroup } from '@/components/form/button-group'
import { Filter } from '@/components/form/filter'
import { PageHeader } from '@/components/page-header'
import { LuFilter } from '@/assets/icons'
import { UsersTable } from './users-table'
import { CreateUserModal } from '@/components/modals/users/create-user-modal'
import { Suspense } from 'react'
import Link from 'next/link'

export default function Users() {
  return (
    <>
      <PageHeader>
        <Filter />
        <ButtonGroup>
          <Button isIcon>
            <LuFilter size={20} />
          </Button>
          <Link href="?create_user=true">
            <Button>Cadastrar</Button>
          </Link>
        </ButtonGroup>
      </PageHeader>
      <Suspense fallback={<h1>Loading</h1>}>
        <UsersTable />
        <CreateUserModal />
      </Suspense>
    </>
  )
}
