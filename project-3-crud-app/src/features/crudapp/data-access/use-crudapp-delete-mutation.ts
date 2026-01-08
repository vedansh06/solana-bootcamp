import { useSolana } from '@/components/solana/use-solana'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { getDeleteJournalEntryInstructionAsync } from '@project/anchor'
import { toastTx } from '@/components/toast-tx'
import { toast } from 'sonner'
import { useCrudappAccountsInvalidate } from './use-crudapp-accounts-invalidate'

export function useCrudappDeleteMutation({ account }: { account: UiWalletAccount }) {
  const { cluster } = useSolana()
  const invalidate = useCrudappAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      // The async version automatically derives the PDA
      const instruction = await getDeleteJournalEntryInstructionAsync({
        owner: signer,
        title,
      })

      return await signAndSend(instruction, signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx, 'Journal entry deleted!')
      await invalidate()
    },
    onError: (error) => {
      console.error('Delete error:', error)
      toast.error(`Failed to delete journal entry: ${error.message}`)
    },
  })
}
