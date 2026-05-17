import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link2, Pencil, Shield, ChevronRight, ArrowRight } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div
      className='flex min-h-screen flex-col'
      style={{ backgroundColor: "var(--background)" }}
    >
      <main className='flex-1'>
        {/* Hero Section */}
        <section className='flex flex-col items-center justify-center px-6 py-24 text-center sm:py-32'>
          <div className='flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground'>
            <span>Simple, fast, and secure link management</span>
            <ChevronRight className='h-4 w-4' />
          </div>
          <h1 className='mt-6 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl'>
            Shorten Your Links,
            <br />
            Amplify Your Reach
          </h1>
          <p className='mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl'>
            Create, manage, and track your short links in one place. Get branded
            URLs that look professional and drive more engagement.
          </p>
          <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
            <Button asChild size='lg' className='gap-2'>
              <Link href='/sign-up'>
                Get Started Free
                <ArrowRight className='h-4 w-4' />
              </Link>
            </Button>
            <Button asChild variant='outline' size='lg'>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className='border-y border-border bg-muted/30 px-6 py-24'>
          <div className='mx-auto max-w-6xl'>
            <div className='mx-auto mb-16 max-w-2xl text-center'>
              <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
                Everything you need to manage links
              </h2>
              <p className='mt-4 text-lg text-muted-foreground'>
                Powerful features to help you create, customize, and monitor
                your short links effortlessly.
              </p>
            </div>
            <div className='grid gap-6 sm:grid-cols-3'>
              <Card className='border-border bg-card'>
                <CardContent className='flex flex-col gap-4 pt-6'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
                    <Link2 className='h-6 w-6 text-primary' />
                  </div>
                  <h3 className='text-xl font-semibold text-foreground'>
                    Shorten Links
                  </h3>
                  <p className='text-muted-foreground'>
                    Convert long, unwieldy URLs into clean, memorable short
                    links that are easy to share anywhere.
                  </p>
                </CardContent>
              </Card>
              <Card className='border-border bg-card'>
                <CardContent className='flex flex-col gap-4 pt-6'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
                    <Pencil className='h-6 w-6 text-primary' />
                  </div>
                  <h3 className='text-xl font-semibold text-foreground'>
                    Custom Aliases
                  </h3>
                  <p className='text-muted-foreground'>
                    Create branded, custom link names that reflect your business
                    or campaign for a professional touch.
                  </p>
                </CardContent>
              </Card>
              <Card className='border-border bg-card'>
                <CardContent className='flex flex-col gap-4 pt-6'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
                    <Shield className='h-6 w-6 text-primary' />
                  </div>
                  <h3 className='text-xl font-semibold text-foreground'>
                    Secure & Reliable
                  </h3>
                  <p className='text-muted-foreground'>
                    Built with enterprise-grade security and powered by Clerk
                    authentication to keep your links safe.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='px-6 py-24 text-center'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              Ready to get started?
            </h2>
            <p className='mt-4 text-lg text-muted-foreground'>
              Join thousands of users who trust our platform to manage their
              links.
            </p>
            <div className='mt-10'>
              <Button asChild size='lg' className='gap-2'>
                <Link href='/sign-up'>
                  Start Free Today
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
