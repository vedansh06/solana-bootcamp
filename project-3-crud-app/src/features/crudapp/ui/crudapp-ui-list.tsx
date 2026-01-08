import { CrudappUiCard } from './crudapp-ui-card'
import { useCrudappAccountsQuery } from '@/features/crudapp/data-access/use-crudapp-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function CrudappUiList({ account }: { account: UiWalletAccount }) {
  const entriesQuery = useCrudappAccountsQuery()

  if (entriesQuery.isLoading) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!entriesQuery.data?.length) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold">No Journal Entries</h2>
        <p className="text-muted-foreground mt-2">Create your first journal entry to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Journal Entries</h2>
        <p className="text-muted-foreground">{entriesQuery.data.length} entries</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {entriesQuery.data.map((entry) => (
          <CrudappUiCard key={entry.address} account={account} entry={entry} />
        ))}
      </div>
    </div>
  )
}
