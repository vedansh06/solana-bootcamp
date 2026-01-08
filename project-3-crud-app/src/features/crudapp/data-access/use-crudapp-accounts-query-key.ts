import { useSolana } from '@/components/solana/use-solana'

export function useCrudappAccountsQueryKey() {
  const { cluster } = useSolana()
  return ['journal-entries', 'accounts', { cluster: cluster.id }]
}
