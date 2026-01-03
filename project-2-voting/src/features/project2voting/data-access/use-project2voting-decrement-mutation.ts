import { Project2votingAccount, getDecrementInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useProject2votingAccountsInvalidate } from './use-project2voting-accounts-invalidate'

export function useProject2votingDecrementMutation({
  account,
  project2voting,
}: {
  account: UiWalletAccount
  project2voting: Project2votingAccount
}) {
  const invalidateAccounts = useProject2votingAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async () => await signAndSend(getDecrementInstruction({ project2voting: project2voting.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
