'use client'

import { useState } from 'react'
import { CrudappAccount, JournalEntryAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { useCrudappUpdateMutation } from '@/features/crudapp/data-access/use-crudapp-update-mutation'
import { useCrudappDeleteMutation } from '@/features/crudapp/data-access/use-crudapp-delete-mutation'
import { Pencil, Trash2, X, Check } from 'lucide-react'

export function CrudappUiCard({ account, crudapp }: { account: UiWalletAccount; crudapp: CrudappAccount }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editMessage, setEditMessage] = useState(crudapp.data.message)
  const updateMutation = useCrudappUpdateMutation({ account })
  const deleteMutation = useCrudappDeleteMutation({ account })

  // Check if current wallet is the owner
  const isOwner = account.address === crudapp.data.owner

  const handleUpdate = async () => {
    if (!editMessage.trim()) return
    await updateMutation.mutateAsync({
      title: crudapp.data.title,
      message: editMessage.trim(),
    })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this crudapp entry?')) {
      await deleteMutation.mutateAsync({ title: crudapp.data.title })
    }
  }

  const handleCancel = () => {
    setEditMessage(crudapp.data.message)
    setIsEditing(false)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{crudapp.data.title}</CardTitle>
            <CardDescription className="mt-1">
              <span className="block">
                Owner: <AppExplorerLink address={crudapp.data.owner} label={ellipsify(crudapp.data.owner)} />
              </span>
              <span className="block mt-1">
                Account: <AppExplorerLink address={crudapp.address} label={ellipsify(crudapp.address)} />
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
          <p className="text-sm whitespace-pre-wrap break-words">{crudapp.data.message}</p>
        )}
      </CardContent>

      {isOwner && (
        <CardFooter className="flex gap-2 justify-end">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel} disabled={updateMutation.isPending}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button size="sm" onClick={handleUpdate} disabled={updateMutation.isPending || !editMessage.trim()}>
                <Check className="h-4 w-4 mr-1" /> {updateMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleteMutation.isPending}>
                <Trash2 className="h-4 w-4 mr-1" /> {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
