'use client'

import { useFetchMyJournals } from '../hooks/use-fetch-journals'
import { JournalCard } from './journal-card'
import { useSolana } from '@/components/solana/use-solana'

export function JournalList() {
  const { account } = useSolana()
  const { data: journals, isLoading, error, refetch } = useFetchMyJournals()

  if (!account) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Connect your wallet to view your journal entries</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-2 text-muted-foreground">Loading journals...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-4">Error loading journals: {error.message}</p>
        <button onClick={() => refetch()} className="text-primary underline">
          Try again
        </button>
      </div>
    )
  }

  if (!journals || journals.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold mb-2">No Journal Entries</h3>
        <p className="text-muted-foreground">Create your first journal entry above to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Journal Entries</h2>
        <p className="text-muted-foreground">{journals.length} entries</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {journals.map((journal) => (
          <JournalCard key={journal.publicKey.toBase58()} publicKey={journal.publicKey} account={journal.account} />
        ))}
      </div>
    </div>
  )
}
