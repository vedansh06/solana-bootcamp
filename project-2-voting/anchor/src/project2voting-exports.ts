// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Project2voting, PROJECT2VOTING_DISCRIMINATOR, PROJECT2VOTING_PROGRAM_ADDRESS, getProject2votingDecoder } from './client/js'
import Project2votingIDL from '../target/idl/project2voting.json'

export type Project2votingAccount = Account<Project2voting, string>

// Re-export the generated IDL and type
export { Project2votingIDL }

export * from './client/js'

export function getProject2votingProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getProject2votingDecoder(),
    filter: getBase58Decoder().decode(PROJECT2VOTING_DISCRIMINATOR),
    programAddress: PROJECT2VOTING_PROGRAM_ADDRESS,
  })
}
