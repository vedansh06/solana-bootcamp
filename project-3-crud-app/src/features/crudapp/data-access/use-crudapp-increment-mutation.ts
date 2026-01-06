import { CrudappAccount, getIncrementInstruction } from '@project/anchor'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { useMutation } from '@tanstack/react-query'
import { toastTx } from '@/components/toast-tx'
import { useCrudappAccountsInvalidate } from './use-crudapp-accounts-invalidate'

export function useCrudappIncrementMutation({
  account,
  crudapp,
}: {
  account: UiWalletAccount
  crudapp: CrudappAccount
}) {
  const invalidateAccounts = useCrudappAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => await signAndSend(getIncrementInstruction({ crudapp: crudapp.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
