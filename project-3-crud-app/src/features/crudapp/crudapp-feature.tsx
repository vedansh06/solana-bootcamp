import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { CrudappUiCreateForm } from './ui/crudapp-ui-create-form'
import { CrudappUiList } from './ui/crudapp-ui-list'
import { CrudappUiProgramExplorerLink } from './ui/crudapp-ui-program-explorer-link'
import { CrudappUiProgramGuard } from './ui/crudapp-ui-program-guard'

export default function CrudappFeature() {
  const { account } = useSolana()

  return (
    <CrudappUiProgramGuard>
      <AppHero
        title="📓 Journal CRUD App"
        subtitle={
          account
            ? 'Create, read, update, and delete journal entries on Solana!'
            : 'Connect your wallet to manage your on-chain journal.'
        }
      >
        <p className="mb-6">
          <CrudappUiProgramExplorerLink />
        </p>
        {!account && (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>

      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {account && (
          <>
            <section>
              <CrudappUiCreateForm account={account} />
            </section>
            <section>
              <CrudappUiList account={account} />
            </section>
          </>
        )}
      </div>
    </CrudappUiProgramGuard>
  )
}
