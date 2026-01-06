import { CrudappAccount, getDecrementInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useCrudappAccountsInvalidate } from './use-crudapp-accounts-invalidate'

export function useCrudappDecrementMutation({
  account,
  crudapp,
}: {
  account: UiWalletAccount
  crudapp: CrudappAccount
}) {
  const invalidateAccounts = useCrudappAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async () => await signAndSend(getDecrementInstruction({ crudapp: crudapp.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
