import { auth } from "@clerk/nextjs/server";
import { getLinksByUserId } from "@/data/links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Link2 } from "lucide-react";

export default async function DashboardPage() {
  await auth.protect();

  const { userId } = await auth();
  const links = userId ? await getLinksByUserId(userId) : [];

  return (
    <div className='flex flex-col align-items justify-center w-6xl space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <Button asChild>
          <a href='/create'>
            <span>New Link</span>
          </a>
        </Button>
      </div>

      <div className='mx-auto w-3xl'>
        {links.length === 0 ? (
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
            {links.map((link) => (
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
    </div>
  );
}
