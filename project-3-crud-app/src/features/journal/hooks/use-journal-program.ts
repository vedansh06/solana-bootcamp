import { useMemo } from 'react'
import { Program, AnchorProvider } from '@coral-xyz/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import { useWalletUiCluster } from '@wallet-ui/react'
import { PROGRAM_ID, IDL } from '@/lib/solana'

export function useJournalProgram() {
  const { cluster } = useWalletUiCluster()

  const program = useMemo(() => {
    const connection = new Connection(cluster.endpoint, 'confirmed')

    // Read-only provider for fetching accounts
    const provider = new AnchorProvider(connection, {} as any, { commitment: 'confirmed' })

    return new Program(IDL, provider)
  }, [cluster.endpoint])

  return { program, programId: PROGRAM_ID }
}
