import { AppExplorerLink } from '@/components/app-explorer-link'
import { CRUDAPP_PROGRAM_ADDRESS } from '@project/anchor'

export function CrudappUiProgramExplorerLink() {
  return <AppExplorerLink address={CRUDAPP_PROGRAM_ADDRESS} label={`Program: ${CRUDAPP_PROGRAM_ADDRESS.slice(0, 8)}...`} />
}
