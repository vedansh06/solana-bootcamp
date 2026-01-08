import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { useWalletUiCluster } from '@wallet-ui/react'
import { useSolana } from '@/components/solana/use-solana'
import { useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { BorshCoder } from '@coral-xyz/anchor'
import { PROGRAM_ID, IDL, getJournalEntryPDA } from '@/lib/solana'
import { toast } from 'sonner'
import { toastTx } from '@/components/toast-tx'

interface DeleteJournalArgs {
  title: string
}

export function useDeleteJournal() {
  const { cluster } = useWalletUiCluster()
  const { account } = useSolana()
  const queryClient = useQueryClient()
  const signer = account ? useWalletUiSigner({ account }) : null
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async ({ title }: DeleteJournalArgs) => {
      if (!account || !signer) {
        throw new Error('Wallet not connected')
      }

      const ownerPubkey = new PublicKey(account.address)
      const journalEntryPDA = getJournalEntryPDA(title, ownerPubkey)

      const coder = new BorshCoder(IDL)

      const instructionData = coder.instruction.encode('deleteJournalEntry', {
        title,
      })

      const instruction = {
        programId: PROGRAM_ID,
        keys: [
          { pubkey: journalEntryPDA, isSigner: false, isWritable: true },
          { pubkey: ownerPubkey, isSigner: true, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data: instructionData,
      }

      const tx = await signAndSend(instruction, signer)
      return tx
    },
    onSuccess: (tx) => {
      toastTx(tx, 'Journal entry deleted!')
      queryClient.invalidateQueries({ queryKey: ['journals'] })
      queryClient.invalidateQueries({ queryKey: ['my-journals'] })
    },
    onError: (error) => {
      console.error('Delete journal error:', error)
      toast.error(`Failed to delete journal: ${error.message}`)
    },
  })
}
