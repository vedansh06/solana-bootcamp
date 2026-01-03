import { Project2votingAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useProject2votingCloseMutation } from '@/features/project2voting/data-access/use-project2voting-close-mutation'

export function Project2votingUiButtonClose({ account, project2voting }: { account: UiWalletAccount; project2voting: Project2votingAccount }) {
  const closeMutation = useProject2votingCloseMutation({ account, project2voting })

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
