import { Project2votingUiCard } from './project2voting-ui-card'
import { useProject2votingAccountsQuery } from '@/features/project2voting/data-access/use-project2voting-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function Project2votingUiList({ account }: { account: UiWalletAccount }) {
  const project2votingAccountsQuery = useProject2votingAccountsQuery()

  if (project2votingAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!project2votingAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {project2votingAccountsQuery.data?.map((project2voting) => (
        <Project2votingUiCard account={account} key={project2voting.address} project2voting={project2voting} />
      ))}
    </div>
  )
}
