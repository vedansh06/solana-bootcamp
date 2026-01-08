import { useMemo } from 'react'
import { AnchorProvider } from '@coral-xyz/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import { useWalletUiCluster } from '@wallet-ui/react'
import { useSolana } from '@/components/solana/use-solana'

export function useAnchorProvider() {
  const { account } = useSolana()
  const { cluster } = useWalletUiCluster()

  const provider = useMemo(() => {
    if (!account) return null

    const connection = new Connection(cluster.endpoint, 'confirmed')

    // Create a wallet adapter compatible with Anchor
    const wallet = {
      publicKey: new PublicKey(account.address),
      signTransaction: async (tx: any) => {
        // This will be handled by the actual wallet adapter
        throw new Error('Use wallet adapter for signing')
      },
      signAllTransactions: async (txs: any[]) => {
        throw new Error('Use wallet adapter for signing')
      },
    }

    return new AnchorProvider(connection, wallet as any, {
      commitment: 'confirmed',
    })
  }, [account, cluster.endpoint])

  return provider
}
