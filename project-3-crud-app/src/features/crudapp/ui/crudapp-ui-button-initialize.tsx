import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'

import { useCrudappInitializeMutation } from '@/features/crudapp/data-access/use-crudapp-initialize-mutation'

export function CrudappUiButtonInitialize({ account }: { account: UiWalletAccount }) {
  const mutationInitialize = useCrudappInitializeMutation({ account })

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize Crudapp {mutationInitialize.isPending && '...'}
    </Button>
  )
}
