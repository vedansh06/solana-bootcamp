import { useSolana } from '@/components/solana/use-solana'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { getUpdateJournalEntryInstructionAsync } from '@project/anchor'
import { toastTx } from '@/components/toast-tx'
import { toast } from 'sonner'
import { useCrudappAccountsInvalidate } from './use-crudapp-accounts-invalidate'

export function useCrudappUpdateMutation({ account }: { account: UiWalletAccount }) {
  const { cluster } = useSolana()
  const invalidate = useCrudappAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async ({ title, message }: { title: string; message: string }) => {
      // The async version automatically derives the PDA
      const instruction = await getUpdateJournalEntryInstructionAsync({
        owner: signer,
        title,
        message,
      })

      return await signAndSend(instruction, signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx, 'Journal entry updated!')
      await invalidate()
    },
    onError: (error) => {
      console.error('Update error:', error)
      toast.error(`Failed to update journal entry: ${error.message}`)
    },
  })
}
