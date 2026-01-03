import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'

import { useProject2votingInitializeMutation } from '@/features/project2voting/data-access/use-project2voting-initialize-mutation'

export function Project2votingUiButtonInitialize({ account }: { account: UiWalletAccount }) {
  const mutationInitialize = useProject2votingInitializeMutation({ account })

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize Project2voting {mutationInitialize.isPending && '...'}
    </Button>
  )
}
