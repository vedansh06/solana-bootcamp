import { CrudappAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { useCrudappIncrementMutation } from '../data-access/use-crudapp-increment-mutation'

export function CrudappUiButtonIncrement({ account, crudapp }: { account: UiWalletAccount; crudapp: CrudappAccount }) {
  const incrementMutation = useCrudappIncrementMutation({ account, crudapp })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}
