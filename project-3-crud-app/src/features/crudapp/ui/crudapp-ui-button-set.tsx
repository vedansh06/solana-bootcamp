import { CrudappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useCrudappSetMutation } from '@/features/crudapp/data-access/use-crudapp-set-mutation'

export function CrudappUiButtonSet({ account, crudapp }: { account: UiWalletAccount; crudapp: CrudappAccount }) {
  const setMutation = useCrudappSetMutation({ account, crudapp })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', crudapp.data.count.toString() ?? '0')
        if (!value || parseInt(value) === crudapp.data.count || isNaN(parseInt(value))) {
          return
        }
        return setMutation.mutateAsync(parseInt(value))
      }}
      disabled={setMutation.isPending}
    >
      Set
    </Button>
  )
}
