// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Crudapp, CRUDAPP_DISCRIMINATOR, CRUDAPP_PROGRAM_ADDRESS, getCrudappDecoder } from './client/js'
import CrudappIDL from '../target/idl/crudapp.json'

export type CrudappAccount = Account<Crudapp, string>

// Re-export the generated IDL and type
export { CrudappIDL }

export * from './client/js'

export function getCrudappProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getCrudappDecoder(),
    filter: getBase58Decoder().decode(CRUDAPP_DISCRIMINATOR),
    programAddress: CRUDAPP_PROGRAM_ADDRESS,
  })
}
