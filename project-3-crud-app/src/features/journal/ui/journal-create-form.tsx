'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useCreateJournal } from '../hooks/use-create-journal'
import { useSolana } from '@/components/solana/use-solana'

export function JournalCreateForm() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const { account } = useSolana()
  const createJournal = useCreateJournal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !message.trim()) return

    await createJournal.mutateAsync({ title: title.trim(), message: message.trim() })
    setTitle('')
    setMessage('')
  }

  const isDisabled = !account || createJournal.isPending || !title.trim() || !message.trim()

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
              disabled={!account}
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
              disabled={!account}
            />
            <p className="text-xs text-muted-foreground">{message.length}/1000 characters</p>
          </div>

          <Button type="submit" disabled={isDisabled} className="w-full">
            {createJournal.isPending ? 'Creating...' : 'Create Entry'}
          </Button>

          {!account && (
            <p className="text-sm text-muted-foreground text-center">Connect your wallet to create entries</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
