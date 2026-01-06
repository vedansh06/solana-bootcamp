import { useSolana } from '@/components/solana/use-solana'

export function useCrudappAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['crudapp', 'accounts', { cluster }]
}
