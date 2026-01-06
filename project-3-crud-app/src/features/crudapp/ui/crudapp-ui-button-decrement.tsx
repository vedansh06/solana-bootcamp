import { CrudappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useCrudappDecrementMutation } from '../data-access/use-crudapp-decrement-mutation'

export function CrudappUiButtonDecrement({ account, crudapp }: { account: UiWalletAccount; crudapp: CrudappAccount }) {
  const decrementMutation = useCrudappDecrementMutation({ account, crudapp })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}
