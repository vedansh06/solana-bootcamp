import { PROJECT2VOTING_PROGRAM_ADDRESS } from '@project/anchor'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function Project2votingUiProgramExplorerLink() {
  return <AppExplorerLink address={PROJECT2VOTING_PROGRAM_ADDRESS} label={ellipsify(PROJECT2VOTING_PROGRAM_ADDRESS)} />
}
