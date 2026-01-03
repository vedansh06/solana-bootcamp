import { useSolana } from '@/components/solana/use-solana'

export function useProject2votingAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['project2voting', 'accounts', { cluster }]
}
