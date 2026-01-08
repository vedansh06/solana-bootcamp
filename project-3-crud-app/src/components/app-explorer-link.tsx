import { getExplorerLink, GetExplorerLinkArgs, SolanaClusterMoniker } from 'gill'
import { useWalletUiCluster } from '@wallet-ui/react'
import { ArrowUpRightFromSquare } from 'lucide-react'

export function AppExplorerLink({
  className,
  label = '',
  ...link
}: GetExplorerLinkArgs & {
  className?: string
  label: string
}) {
  const { cluster } = useWalletUiCluster()
  return (
    <a
      href={getExplorerLink({ ...link, cluster: cluster.id as SolanaClusterMoniker })}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? className : `link font-mono inline-flex gap-1`}
    >
      {label}
      <ArrowUpRightFromSquare size={12} />
    </a>
  )
}