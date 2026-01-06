import { useQueryClient } from '@tanstack/react-query'
import { useCrudappAccountsQueryKey } from './use-crudapp-accounts-query-key'

export function useCrudappAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useCrudappAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
