import { useQueryClient } from '@tanstack/react-query'
import { useProject2votingAccountsQueryKey } from './use-project2voting-accounts-query-key'

export function useProject2votingAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useProject2votingAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
