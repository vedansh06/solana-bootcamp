'use client'

import { useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'
import { useUpdateJournal } from '../hooks/use-update-journal'
import { useDeleteJournal } from '../hooks/use-delete-journal'
import { useSolana } from '@/components/solana/use-solana'
import { JournalEntryAccount } from '@/lib/solana'
import { Pencil, Trash2, X, Check } from 'lucide-react'

interface JournalCardProps {
  publicKey: PublicKey
  account: JournalEntryAccount
}

export function JournalCard({ publicKey, account }: JournalCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editMessage, setEditMessage] = useState(account.message)
  const { account: walletAccount } = useSolana()
  const updateJournal = useUpdateJournal()
  const deleteJournal = useDeleteJournal()

  const isOwner = walletAccount && new PublicKey(walletAccount.address).equals(account.owner)

  const handleUpdate = async () => {
    if (!editMessage.trim()) return
    await updateJournal.mutateAsync({
      title: account.title,
      message: editMessage.trim(),
    })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this journal entry?')) {
      await deleteJournal.mutateAsync({ title: account.title })
    }
  }

  const handleCancel = () => {
    setEditMessage(account.message)
    setIsEditing(false)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{account.title}</CardTitle>
            <CardDescription className="mt-1">
              <span className="block">
                Owner:{' '}
                <AppExplorerLink address={account.owner.toBase58()} label={ellipsify(account.owner.toBase58())} />
              </span>
              <span className="block mt-1">
                Account: <AppExplorerLink address={publicKey.toBase58()} label={ellipsify(publicKey.toBase58())} />
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <Label htmlFor="edit-message">Edit Message</Label>
            <textarea
              id="edit-message"
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              maxLength={1000}
              rows={4}
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <p className="text-xs text-muted-foreground">{editMessage.length}/1000 characters</p>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap break-words">{account.message}</p>
        )}
      </CardContent>

      {isOwner && (
        <CardFooter className="flex gap-2 justify-end">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel} disabled={updateJournal.isPending}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleUpdate} disabled={updateJournal.isPending || !editMessage.trim()}>
                <Check className="h-4 w-4 mr-1" />
                {updateJournal.isPending ? 'Saving...' : 'Save'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleteJournal.isPending}>
                <Trash2 className="h-4 w-4 mr-1" />
                {deleteJournal.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
