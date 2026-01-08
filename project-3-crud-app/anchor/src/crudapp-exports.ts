// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import {
  JournalEntryState,
  JOURNAL_ENTRY_STATE_DISCRIMINATOR,
  getJournalEntryStateDecoder,
  CRUDAPP_PROGRAM_ADDRESS,
} from './client/js'
import CrudappIDL from '../target/idl/crudapp.json'

export type JournalEntryAccount = Account<JournalEntryState, string>

// Backward compatibility alias
export type CrudappAccount = JournalEntryAccount

// Re-export the generated IDL and type
export { CrudappIDL, CRUDAPP_PROGRAM_ADDRESS }

export * from './client/js'

export function getJournalEntryProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getJournalEntryStateDecoder(),
    filter: getBase58Decoder().decode(JOURNAL_ENTRY_STATE_DISCRIMINATOR),
    programAddress: CRUDAPP_PROGRAM_ADDRESS,
  })
}

// Backward compatibility alias
export const getCrudappProgramAccounts = getJournalEntryProgramAccounts
