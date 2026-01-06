import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getCrudappProgramAccounts } from '@project/anchor'
import { useCrudappAccountsQueryKey } from './use-crudapp-accounts-query-key'

export function useCrudappAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useCrudappAccountsQueryKey(),
    queryFn: async () => await getCrudappProgramAccounts(client.rpc),
  })
}
