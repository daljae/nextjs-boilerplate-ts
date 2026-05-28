import { auth, signOut } from "@/lib/auth"
import { CommunityHome } from "@/components/community/community-home"
import Link from "next/link"

export default async function Home() {
  const session = await auth()

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        {/* Hero Section - Apple Style */}
        <div className="max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Community
          </p>
          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl" style={{ lineHeight: 1.07, letterSpacing: '-0.015em' }}>
            Connect. Share.{" "}
            <span className="text-primary">Grow together.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground" style={{ fontSize: '21px', lineHeight: 1.38 }}>
            A space where ideas flourish and conversations inspire. Join our community of passionate creators and thinkers.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-normal text-primary-foreground transition-transform active:scale-95"
            >
              Get started
            </Link>
            <button className="inline-flex h-12 items-center justify-center rounded-full border border-primary bg-transparent px-8 text-base font-normal text-primary transition-transform active:scale-95">
              Learn more
            </button>
          </div>
        </div>

        {/* Feature Tiles - Apple Edge-to-Edge Style */}
        <div className="mt-24 grid w-full max-w-5xl gap-0 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center bg-secondary p-12 text-center">
            <p className="text-4xl font-semibold tracking-tight text-foreground">12.4k+</p>
            <p className="mt-2 text-sm text-muted-foreground">Active members</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-card p-12 text-center">
            <p className="text-4xl font-semibold tracking-tight text-foreground">50k+</p>
            <p className="mt-2 text-sm text-muted-foreground">Posts shared</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-secondary p-12 text-center">
            <p className="text-4xl font-semibold tracking-tight text-foreground">99%</p>
            <p className="mt-2 text-sm text-muted-foreground">Satisfaction</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Apple Style Navigation */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground">
              Community
            </Link>
            <nav className="hidden items-center gap-6 sm:flex">
              <Link href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                Feed
              </Link>
              <Link href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                Explore
              </Link>
              <Link href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                Popular
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden text-xs text-muted-foreground sm:block">
              {session.user?.email}
            </p>
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
              <button
                type="submit"
                className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <CommunityHome
        userName={session.user?.name ?? session.user?.email ?? "Member"}
      />
    </main>
  )
}
