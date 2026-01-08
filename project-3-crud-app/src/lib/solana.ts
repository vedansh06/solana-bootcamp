import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import CrudappIDL from '@/idl/crudapp.json'

// Program ID from the IDL
export const PROGRAM_ID = new PublicKey(CrudappIDL.address)

// Export the IDL
export const IDL = CrudappIDL as Idl

// Journal Entry Account Type
export interface JournalEntryAccount {
  owner: PublicKey
  title: string
  message: string
}

// Get the program instance
export function getCrudProgram(provider: AnchorProvider) {
  return new Program(IDL, provider)
}

// Derive PDA for journal entry
export function getJournalEntryPDA(title: string, owner: PublicKey): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync([Buffer.from(title), owner.toBuffer()], PROGRAM_ID)
  return pda
}
