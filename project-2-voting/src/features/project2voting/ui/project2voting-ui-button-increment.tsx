import { Project2votingAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { useProject2votingIncrementMutation } from '../data-access/use-project2voting-increment-mutation'

export function Project2votingUiButtonIncrement({ account, project2voting }: { account: UiWalletAccount; project2voting: Project2votingAccount }) {
  const incrementMutation = useProject2votingIncrementMutation({ account, project2voting })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}
