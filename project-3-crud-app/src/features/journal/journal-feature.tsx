'use client'

import { AppHero } from '@/components/app-hero'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { useSolana } from '@/components/solana/use-solana'
import { JournalCreateForm } from './ui/journal-create-form'
import { JournalList } from './ui/journal-list'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { PROGRAM_ID } from '@/lib/solana'

export function JournalFeature() {
  const { account } = useSolana()

  return (
    <div className="container mx-auto px-4 py-8">
      <AppHero
        title="📓 Journal CRUD App"
        subtitle={
          account
            ? 'Create, read, update, and delete journal entries on Solana!'
            : 'Connect your wallet to manage your on-chain journal.'
        }
      >
        <div className="mb-4">
          <AppExplorerLink address={PROGRAM_ID.toBase58()} label={`Program: ${PROGRAM_ID.toBase58().slice(0, 8)}...`} />
        </div>
        {!account && (
          <div className="inline-block">
            <WalletDropdown />
          </div>
        )}
      </AppHero>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Create Section */}
        <section>
          <JournalCreateForm />
        </section>

        {/* List Section (Read, Update, Delete) */}
        <section>
          <JournalList />
        </section>
      </div>
    </div>
  )
}
