import { useQuery } from '@tanstack/react-query'
import { Connection, PublicKey } from '@solana/web3.js'
import { useWalletUiCluster } from '@wallet-ui/react'
import { useSolana } from '@/components/solana/use-solana'
import { PROGRAM_ID, JournalEntryAccount } from '@/lib/solana'
import { BorshCoder } from '@coral-xyz/anchor'
import { IDL } from '@/lib/solana'

export interface JournalEntry {
  publicKey: PublicKey
  account: JournalEntryAccount
}

export function useFetchJournals() {
  const { cluster } = useWalletUiCluster()
  const { account } = useSolana()

  return useQuery({
    queryKey: ['journals', cluster.id, account?.address],
    queryFn: async (): Promise<JournalEntry[]> => {
      const connection = new Connection(cluster.endpoint, 'confirmed')

      const accounts = await connection.getProgramAccounts(PROGRAM_ID, {
        commitment: 'confirmed',
      })

      const coder = new BorshCoder(IDL)

      const journals: JournalEntry[] = []

      for (const { pubkey, account: accountInfo } of accounts) {
        try {
          const decoded = coder.accounts.decode('journalEntryState', accountInfo.data) as JournalEntryAccount

          journals.push({
            publicKey: pubkey,
            account: decoded,
          })
        } catch (e) {
          // Skip accounts that can't be decoded
          console.error('Failed to decode account:', e)
        }
      }

      return journals
    },
    enabled: true,
    refetchInterval: 5000,
  })
}

// Fetch journals for the current user only
export function useFetchMyJournals() {
  const { cluster } = useWalletUiCluster()
  const { account } = useSolana()

  return useQuery({
    queryKey: ['my-journals', cluster.id, account?.address],
    queryFn: async (): Promise<JournalEntry[]> => {
      if (!account) return []

      const connection = new Connection(cluster.endpoint, 'confirmed')
      const ownerPubkey = new PublicKey(account.address)

      const accounts = await connection.getProgramAccounts(PROGRAM_ID, {
        commitment: 'confirmed',
        filters: [
          {
            memcmp: {
              offset: 8, // After discriminator
              bytes: ownerPubkey.toBase58(),
            },
          },
        ],
      })

      const coder = new BorshCoder(IDL)

      const journals: JournalEntry[] = []

      for (const { pubkey, account: accountInfo } of accounts) {
        try {
          const decoded = coder.accounts.decode('journalEntryState', accountInfo.data) as JournalEntryAccount

          journals.push({
            publicKey: pubkey,
            account: decoded,
          })
        } catch (e) {
          console.error('Failed to decode account:', e)
        }
      }

      return journals
    },
    enabled: !!account,
    refetchInterval: 5000,
  })
}
