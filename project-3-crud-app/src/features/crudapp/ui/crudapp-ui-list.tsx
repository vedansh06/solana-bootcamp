import { CrudappUiCard } from './crudapp-ui-card'
import { useCrudappAccountsQuery } from '@/features/crudapp/data-access/use-crudapp-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function CrudappUiList({ account }: { account: UiWalletAccount }) {
  const crudappAccountsQuery = useCrudappAccountsQuery()

  if (crudappAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!crudappAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {crudappAccountsQuery.data?.map((crudapp) => (
        <CrudappUiCard account={account} key={crudapp.address} crudapp={crudapp} />
      ))}
    </div>
  )
}
