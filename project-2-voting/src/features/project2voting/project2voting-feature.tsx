import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { Project2votingUiButtonInitialize } from './ui/project2voting-ui-button-initialize'
import { Project2votingUiList } from './ui/project2voting-ui-list'
import { Project2votingUiProgramExplorerLink } from './ui/project2voting-ui-program-explorer-link'
import { Project2votingUiProgramGuard } from './ui/project2voting-ui-program-guard'

export default function Project2votingFeature() {
  const { account } = useSolana()

  return (
    <Project2votingUiProgramGuard>
      <AppHero
        title="Decentralized Polling App"
subtitle={
  account
    ? "Create and manage on-chain polls using Solana."
    : 'Select a wallet to run the program.'
}
      >
        <p className="mb-6">
          <Project2votingUiProgramExplorerLink />
        </p>
        {account ? (
          <Project2votingUiButtonInitialize account={account} />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>
      {account ? <Project2votingUiList account={account} /> : null}
    </Project2votingUiProgramGuard>
  )
}
