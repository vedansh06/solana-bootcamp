import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { CrudappUiButtonInitialize } from './ui/crudapp-ui-button-initialize'
import { CrudappUiList } from './ui/crudapp-ui-list'
import { CrudappUiProgramExplorerLink } from './ui/crudapp-ui-program-explorer-link'
import { CrudappUiProgramGuard } from './ui/crudapp-ui-program-guard'

export default function CrudappFeature() {
  const { account } = useSolana()

  return (
    <CrudappUiProgramGuard>
      <AppHero
        title="Crudapp"
        subtitle={
          account
            ? "Initialize a new crudapp onchain by clicking the button. Use the program's methods (increment, decrement, set, and close) to change the state of the account."
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <CrudappUiProgramExplorerLink />
        </p>
        {account ? (
          <CrudappUiButtonInitialize account={account} />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>
      {account ? <CrudappUiList account={account} /> : null}
    </CrudappUiProgramGuard>
  )
}
