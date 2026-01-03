import { Project2votingAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useProject2votingDecrementMutation } from '../data-access/use-project2voting-decrement-mutation'

export function Project2votingUiButtonDecrement({ account, project2voting }: { account: UiWalletAccount; project2voting: Project2votingAccount }) {
  const decrementMutation = useProject2votingDecrementMutation({ account, project2voting })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}
