import { useCrudappProgram } from '@/features/crudapp/data-access/use-crudapp-program'
import { ReactNode } from 'react'

export function CrudappUiProgramGuard({ children }: { children: ReactNode }) {
  const programQuery = useCrudappProgram()

  if (programQuery.isLoading) {
    return <div className="flex justify-center py-8"><span className="loading loading-spinner loading-lg"></span></div>
  }

  if (programQuery.isError || !programQuery.data) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-destructive">Program Not Found</h2>
        <p className="text-muted-foreground mt-2">
          Make sure the program is deployed and you are connected to the correct cluster.
        </p>
      </div>
    )
  }

  return <>{children}</>
}
