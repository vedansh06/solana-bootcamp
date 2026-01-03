import { Project2votingAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { Project2votingUiButtonClose } from './project2voting-ui-button-close'
import { Project2votingUiButtonDecrement } from './project2voting-ui-button-decrement'
import { Project2votingUiButtonIncrement } from './project2voting-ui-button-increment'
import { Project2votingUiButtonSet } from './project2voting-ui-button-set'

export function Project2votingUiCard({ account, project2voting }: { account: UiWalletAccount; project2voting: Project2votingAccount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project2voting: {project2voting.data.count}</CardTitle>
        <CardDescription>
          Account: <AppExplorerLink address={project2voting.address} label={ellipsify(project2voting.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <Project2votingUiButtonIncrement account={account} project2voting={project2voting} />
          <Project2votingUiButtonSet account={account} project2voting={project2voting} />
          <Project2votingUiButtonDecrement account={account} project2voting={project2voting} />
          <Project2votingUiButtonClose account={account} project2voting={project2voting} />
        </div>
      </CardContent>
    </Card>
  )
}
