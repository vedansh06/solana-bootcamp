import { Project2votingAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useProject2votingSetMutation } from '@/features/project2voting/data-access/use-project2voting-set-mutation'

export function Project2votingUiButtonSet({ account, project2voting }: { account: UiWalletAccount; project2voting: Project2votingAccount }) {
  const setMutation = useProject2votingSetMutation({ account, project2voting })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', project2voting.data.count.toString() ?? '0')
        if (!value || parseInt(value) === project2voting.data.count || isNaN(parseInt(value))) {
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
