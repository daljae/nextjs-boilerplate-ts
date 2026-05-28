import { auth, signOut } from "@/lib/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import { CommunityHome } from "@/components/community/community-home"

export default async function Home() {
  const session = await auth()

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md rounded-[2rem] border border-border/60 bg-card/80 p-8 text-center shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Community Prototype
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Login required
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Posting and comments are available to logged-in users only.
          </p>
          <div className="mt-6">
            <a href="/login" className={buttonVariants({ size: "lg" })}>
              Sign in with Google
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 bg-background/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Community Prototype
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Signed in as {session.user?.email}
          </p>
        </div>
        <form
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/" })
          }}
        >
          <Button type="submit" variant="outline" size="sm">
            Sign out
          </Button>
        </form>
      </header>

      <CommunityHome
        userName={session.user?.name ?? session.user?.email ?? "Member"}
      />
    </main>
  )
}
