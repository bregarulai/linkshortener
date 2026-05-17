'use client'

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, Link2 } from "lucide-react";
import { CreateLinkDialog } from "@/components/create-link-dialog";

interface Link {
  id: number;
  userId: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DashboardClientProps {
  initialLinks: any[];
}

export function DashboardClient({ initialLinks }: DashboardClientProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreated = useCallback(() => {
    window.location.reload()
  }, [])

  return (
    <div className='flex flex-col align-items justify-center w-6xl space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className='mr-2 size-4' />
          <span>New Link</span>
        </Button>
      </div>

      <div className='mx-auto w-3xl'>
        {initialLinks.length === 0 ? (
          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col items-center gap-2 text-center'>
                <Link2 className='size-8 text-muted-foreground' />
                <p className='text-muted-foreground'>
                  No links yet. Create your first short link.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4'>
            {initialLinks.map((link) => (
              <Card key={link.id}>
                <CardHeader className='pb-3'>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-base'>
                      <a
                        href={`/${link.shortCode}`}
                        className='hover:underline'
                      >
                        {`/${link.shortCode}`}
                      </a>
                    </CardTitle>
                    <Button variant='ghost' size='icon-xs' asChild>
                      <a
                        href={`/${link.shortCode}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='size-4' />
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground truncate'>
                    {link.originalUrl}
                  </p>
                  <p className='mt-2 text-xs text-muted-foreground'>
                    Created {new Date(link.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <CreateLinkDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreated={handleCreated}
      />
    </div>
  )
}
