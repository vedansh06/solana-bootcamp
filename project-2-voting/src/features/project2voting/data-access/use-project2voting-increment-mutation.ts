import { Project2votingAccount, getIncrementInstruction } from '@project/anchor'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { useMutation } from '@tanstack/react-query'
import { toastTx } from '@/components/toast-tx'
import { useProject2votingAccountsInvalidate } from './use-project2voting-accounts-invalidate'

export function useProject2votingIncrementMutation({
  account,
  project2voting,
}: {
  account: UiWalletAccount
  project2voting: Project2votingAccount
}) {
  const invalidateAccounts = useProject2votingAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => await signAndSend(getIncrementInstruction({ project2voting: project2voting.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
