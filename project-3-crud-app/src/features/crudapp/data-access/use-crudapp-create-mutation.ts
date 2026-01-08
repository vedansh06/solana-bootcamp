import { useSolana } from '@/components/solana/use-solana'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { getCreateJournalEntryInstructionAsync } from '@project/anchor'
import { toastTx } from '@/components/toast-tx'
import { toast } from 'sonner'
import { useCrudappAccountsInvalidate } from './use-crudapp-accounts-invalidate'

export function useCrudappCreateMutation({ account }: { account: UiWalletAccount }) {
  const { cluster } = useSolana()
  const invalidate = useCrudappAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async ({ title, message }: { title: string; message: string }) => {
      console.log('Creating journal entry:', {
        title,
        message,
        owner: account.address,
        clusterId: cluster.id,
        clusterEndpoint: cluster.endpoint,
      })

      try {
        // Verify signer is valid
        if (!signer) {
          throw new Error('Wallet signer not available')
        }

        console.log('Signer object:', signer)
        console.log('Signer address:', signer.address)

        // The async version automatically derives the PDA
        // Pass signer directly - it should already have the correct format
        const instruction = await getCreateJournalEntryInstructionAsync({
          owner: signer,
          title,
          message,
        })

        console.log('Instruction created:', {
          programAddress: instruction.programAddress,
          accounts: instruction.accounts,
          data: instruction.data,
        })

        // Ensure instruction has all required fields
        if (!instruction.accounts || instruction.accounts.length === 0) {
          throw new Error('Instruction missing accounts')
        }

        if (!instruction.data) {
          throw new Error('Instruction missing data')
        }

        console.log('Calling signAndSend...')
        
        // Pass instruction and signer separately
        const result = await signAndSend(instruction, signer)

        console.log('Transaction result:', result)
        return result
      } catch (error: any) {
        console.error('Detailed error:', {
          message: error?.message,
          name: error?.name,
          cause: error?.cause,
          logs: error?.logs,
          stack: error?.stack,
          errorString: String(error),
          errorType: typeof error,
          fullError: error,
        })
        
        // Provide more specific error messages
        if (error?.message?.includes('User rejected') || error?.message?.includes('rejected')) {
          throw new Error('Transaction was cancelled by user')
        }
        if (error?.message?.includes('insufficient') || error?.message?.includes('funds')) {
          throw new Error('Insufficient SOL for transaction fees. Please add SOL to your wallet.')
        }
        if (error?.message?.includes('blockhash')) {
          throw new Error('Transaction expired, please try again')
        }
        if (error?.message?.includes('Unexpected error')) {
          throw new Error('Transaction failed. Please check your wallet connection and try again.')
        }
        
        throw error
      }
    },
    onSuccess: async (tx) => {
      toastTx(tx, 'Journal entry created!')
      await invalidate()
    },
    onError: (error: any) => {
      console.error('Create error:', error)
      const errorMessage = error?.message || error?.cause?.message || 'Unknown error'
      toast.error(`Failed to create journal entry: ${errorMessage}`)
    },
  })
}