"use client"

import { useId, useState, type FormEvent } from "react"
import {
  Bell,
  Bookmark,
  Heart,
  MessageCircle,
  PencilLine,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Post = {
  id: number
  author: string
  tag: string
  title: string
  content: string
  time: string
  likes: number
  comments: string[]
  bookmarked: boolean
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Mina",
    tag: "Question",
    title: "Welcome to the community",
    content:
      "Introduce yourself and share your first post. A simple hello is more than enough today.",
    time: "3m ago",
    likes: 42,
    comments: ["Nice to meet you!", "I just joined too. Looking forward to hanging out."],
    bookmarked: false,
  },
  {
    id: 2,
    author: "Admin",
    tag: "Notice",
    title: "This week`s community guide",
    content:
      "Be kind to each other and keep questions specific. Featured posts will be pinned to the top.",
    time: "18m ago",
    likes: 86,
    comments: ["Got it, thanks."],
    bookmarked: true,
  },
]

export function CommunityHome({ userName }: { userName: string }) {
  const titleId = useId()
  const [draftTitle, setDraftTitle] = useState("")
  const [draftContent, setDraftContent] = useState("")
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({})
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const notices = [
    {
      title: "Notice",
      body: "Weekly best posts are pinned every evening at 8 PM.",
    },
    {
      title: "Rules",
      body: "Only logged-in users can create posts and comments.",
    },
  ]

  const popularPosts = posts
    .slice()
    .sort(
      (a, b) =>
        b.likes + b.comments.length * 4 - (a.likes + a.comments.length * 4)
    )
    .slice(0, 3)

  const recentPosts = posts.slice().sort((a, b) => b.id - a.id)

  function handleCreatePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextTitle = draftTitle.trim()
    const nextContent = draftContent.trim()

    if (!nextTitle || !nextContent) return

    setPosts((current) => [
      {
        id: Date.now(),
        author: userName,
        tag: "New Post",
        title: nextTitle,
        content: nextContent,
        time: "just now",
        likes: 0,
        comments: [],
        bookmarked: false,
      },
      ...current,
    ])

    setDraftTitle("")
    setDraftContent("")
  }

  function handleAddComment(postId: number) {
    const value = commentDrafts[postId]?.trim()
    if (!value) return

    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, `${userName}: ${value}`] }
          : post
      )
    )

    setCommentDrafts((current) => ({ ...current, [postId]: "" }))
  }

  function handleLike(postId: number) {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    )
  }

  function handleBookmark(postId: number) {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    )
  }

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,199,125,0.25),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(99,102,241,0.14),_transparent_28%),linear-gradient(180deg,_var(--background),_oklch(0.985_0_0)_60%,_var(--background))] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <Card className="border-border/60 bg-card/90 shadow-sm backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  CAFE
                </span>
                Community Home
              </CardTitle>
              <CardDescription>
                {userName}, here is your personalized feed with notices and popular posts.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-border/70 bg-muted/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Members
                </p>
                <p className="mt-2 text-2xl font-semibold">12.4k</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-muted/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Posts Today
                </p>
                <p className="mt-2 text-2xl font-semibold">{posts.length + 18}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-muted/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Replies
                </p>
                <p className="mt-2 text-2xl font-semibold">
                  {posts.reduce((total, post) => total + post.comments.length, 0)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/90 shadow-sm backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="size-4" />
                Notices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notices.map((notice) => (
                <div
                  key={notice.title}
                  className="rounded-2xl border border-border/70 bg-muted/40 p-4"
                >
                  <p className="text-sm font-semibold">{notice.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{notice.body}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/90 shadow-sm backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-4" />
                Popular
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {popularPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="rounded-2xl border border-border/70 bg-muted/40 p-4"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    #{index + 1}
                  </p>
                  <p className="mt-2 font-semibold">{post.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {post.author} · Likes {post.likes} · Replies {post.comments.length}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        <section aria-labelledby={titleId} className="space-y-6">
          <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 shadow-[0_30px_60px_rgba(0,0,0,0.08)] backdrop-blur">
            <div className="border-b border-border/60 px-6 py-5 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Community Home
              </p>
              <h1
                id={titleId}
                className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Catch the latest stories first
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                This prototype centers notices and popular posts. Post creation and comments
                happen inline so the page feels like a real community home.
              </p>
            </div>

            <div className="grid gap-4 px-6 py-6 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <Card className="border-border/70 bg-muted/35">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PencilLine className="size-4" />
                    Write a post
                  </CardTitle>
                  <CardDescription>
                    New posts appear at the top of the feed immediately.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePost} className="space-y-4">
                    <input
                      value={draftTitle}
                      onChange={(event) => setDraftTitle(event.target.value)}
                      placeholder="Enter a title"
                      className="w-full rounded-xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-4 focus:ring-ring/15"
                    />
                    <textarea
                      value={draftContent}
                      onChange={(event) => setDraftContent(event.target.value)}
                      placeholder="Enter the post content"
                      rows={6}
                      className="w-full resize-none rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm leading-6 outline-none transition focus:border-ring focus:ring-4 focus:ring-ring/15"
                    />
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-muted-foreground">
                        Only logged-in users can post.
                      </p>
                      <Button type="submit">Publish</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-muted/35">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="size-4" />
                    Recent activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentPosts.slice(0, 4).map((post) => (
                    <div
                      key={post.id}
                      className="rounded-2xl border border-border/70 bg-background p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold">{post.title}</p>
                        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                          {post.tag}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {post.author} · {post.time}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Likes {post.likes} · Replies {post.comments.length}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Card
                key={post.id}
                className="border-border/60 bg-card/90 shadow-sm backdrop-blur"
              >
                <CardHeader className="gap-3 border-b border-border/60">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        {post.tag}
                      </p>
                      <CardTitle className="mt-1 text-xl">{post.title}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{post.time}</p>
                  </div>
                  <CardDescription>
                    {post.author} · Likes {post.likes} · Replies {post.comments.length}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 py-5">
                  <p className="text-sm leading-6 text-foreground/90">{post.content}</p>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={() => handleLike(post.id)}>
                      <Heart className="mr-1.5 size-4" />
                      Like
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBookmark(post.id)}>
                      <Bookmark className="mr-1.5 size-4" />
                      {post.bookmarked ? "Bookmarked" : "Bookmark"}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Comments</p>
                    <div className="space-y-2">
                      {post.comments.length === 0 ? (
                        <p className="rounded-2xl border border-dashed border-border/70 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                          No comments yet. Be the first one to reply.
                        </p>
                      ) : (
                        post.comments.map((comment, index) => (
                          <div
                            key={`${post.id}-${index}`}
                            className="rounded-2xl border border-border/70 bg-muted/30 px-4 py-3 text-sm leading-6"
                          >
                            {comment}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                      <input
                        value={commentDrafts[post.id] ?? ""}
                        onChange={(event) =>
                          setCommentDrafts((current) => ({
                            ...current,
                            [post.id]: event.target.value,
                          }))
                        }
                        placeholder="Write a comment"
                        className="w-full rounded-xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-4 focus:ring-ring/15"
                      />
                      <Button type="button" onClick={() => handleAddComment(post.id)}>
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
