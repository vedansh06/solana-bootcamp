import { CrudappAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { CrudappUiButtonClose } from './crudapp-ui-button-close'
import { CrudappUiButtonDecrement } from './crudapp-ui-button-decrement'
import { CrudappUiButtonIncrement } from './crudapp-ui-button-increment'
import { CrudappUiButtonSet } from './crudapp-ui-button-set'

export function CrudappUiCard({ account, crudapp }: { account: UiWalletAccount; crudapp: CrudappAccount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crudapp: {crudapp.data.count}</CardTitle>
        <CardDescription>
          Account: <AppExplorerLink address={crudapp.address} label={ellipsify(crudapp.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <CrudappUiButtonIncrement account={account} crudapp={crudapp} />
          <CrudappUiButtonSet account={account} crudapp={crudapp} />
          <CrudappUiButtonDecrement account={account} crudapp={crudapp} />
          <CrudappUiButtonClose account={account} crudapp={crudapp} />
        </div>
      </CardContent>
    </Card>
  )
}
