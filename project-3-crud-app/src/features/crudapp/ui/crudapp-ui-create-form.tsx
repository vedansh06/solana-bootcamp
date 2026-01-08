'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { UiWalletAccount } from '@wallet-ui/react'
import { useCrudappCreateMutation } from '@/features/crudapp/data-access/use-crudapp-create-mutation'

export function CrudappUiCreateForm({ account }: { account: UiWalletAccount }) {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const createMutation = useCrudappCreateMutation({ account })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !message.trim()) return

    await createMutation.mutateAsync({ title: title.trim(), message: message.trim() })
    setTitle('')
    setMessage('')
  }

  const isDisabled = createMutation.isPending || !title.trim() || !message.trim()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Journal Entry</CardTitle>
        <CardDescription>Add a new journal entry to the blockchain</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter journal title..."
              maxLength={50}
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">{title.length}/50 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your journal entry..."
              maxLength={1000}
              rows={4}
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <p className="text-xs text-muted-foreground">{message.length}/1000 characters</p>
          </div>

          <Button type="submit" disabled={isDisabled} className="w-full">
            {createMutation.isPending ? 'Creating...' : 'Create Entry'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
