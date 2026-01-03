import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getProject2votingProgramAccounts } from '@project/anchor'
import { useProject2votingAccountsQueryKey } from './use-project2voting-accounts-query-key'

export function useProject2votingAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useProject2votingAccountsQueryKey(),
    queryFn: async () => await getProject2votingProgramAccounts(client.rpc),
  })
}
