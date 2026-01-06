import { CrudappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useCrudappCloseMutation } from '@/features/crudapp/data-access/use-crudapp-close-mutation'

export function CrudappUiButtonClose({ account, crudapp }: { account: UiWalletAccount; crudapp: CrudappAccount }) {
  const closeMutation = useCrudappCloseMutation({ account, crudapp })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Close
    </Button>
  )
}
