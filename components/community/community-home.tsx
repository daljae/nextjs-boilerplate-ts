"use client"

import { useId, useState, type FormEvent } from "react"
import {
  Heart,
  MessageCircle,
  Bookmark,
  TrendingUp,
  Bell,
  PencilLine,
} from "lucide-react"

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
    title: "This week's community guide",
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
    { title: "Notice", body: "Weekly best posts are pinned every evening at 8 PM." },
    { title: "Rules", body: "Only logged-in users can create posts and comments." },
  ]

  const popularPosts = posts
    .slice()
    .sort((a, b) => b.likes + b.comments.length * 4 - (a.likes + a.comments.length * 4))
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
    <div className="bg-background">
      {/* Hero Section - Apple Cinematic Style */}
      <section className="border-b border-border/60 bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Welcome back, {userName}
          </p>
          <h1
            id={titleId}
            className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            style={{ lineHeight: 1.1, letterSpacing: "-0.015em" }}
          >
            Discover stories that{" "}
            <span className="text-primary">inspire.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground" style={{ fontSize: "17px", lineHeight: 1.47 }}>
            Your personalized feed with the latest notices and trending conversations from the community.
          </p>
        </div>
      </section>

      {/* Stats Tiles - Apple Edge-to-Edge */}
      <section className="grid sm:grid-cols-3">
        <div className="flex flex-col items-center justify-center bg-card p-10 text-center">
          <p className="text-3xl font-semibold tracking-tight text-foreground">12.4k</p>
          <p className="mt-1 text-sm text-muted-foreground">Members</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-secondary p-10 text-center">
          <p className="text-3xl font-semibold tracking-tight text-foreground">{posts.length + 18}</p>
          <p className="mt-1 text-sm text-muted-foreground">Posts Today</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-card p-10 text-center">
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            {posts.reduce((total, post) => total + post.comments.length, 0)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Replies</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Notices */}
            <div>
              <div className="flex items-center gap-2">
                <Bell className="size-4 text-muted-foreground" />
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Notices
                </h2>
              </div>
              <div className="mt-4 space-y-3">
                {notices.map((notice) => (
                  <div key={notice.title} className="rounded-2xl bg-secondary p-5">
                    <p className="text-sm font-semibold text-foreground">{notice.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{notice.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular */}
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-muted-foreground" />
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Popular
                </h2>
              </div>
              <div className="mt-4 space-y-3">
                {popularPosts.map((post, index) => (
                  <div key={post.id} className="rounded-2xl bg-secondary p-5">
                    <p className="text-xs font-medium text-primary">#{index + 1}</p>
                    <p className="mt-2 font-semibold text-foreground">{post.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {post.author} · {post.likes} likes
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <section aria-labelledby={titleId} className="space-y-8">
            {/* Write Post Card - Apple Style */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <PencilLine className="size-4 text-muted-foreground" />
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Write a post
                </h2>
              </div>
              <form onSubmit={handleCreatePost} className="mt-5 space-y-4">
                <input
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  placeholder="Enter a title"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <textarea
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Only logged-in users can post.</p>
                  <button
                    type="submit"
                    className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-transform active:scale-95"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex items-center gap-2">
                <MessageCircle className="size-4 text-muted-foreground" />
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Recent activity
                </h2>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {recentPosts.slice(0, 4).map((post) => (
                  <div key={post.id} className="rounded-2xl bg-secondary p-5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-foreground">{post.title}</p>
                      <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {post.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {post.author} · {post.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Post List - Apple Clean Cards */}
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <article key={post.id} className="rounded-2xl border border-border bg-card">
                  {/* Post Header */}
                  <div className="border-b border-border/60 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {post.tag}
                        </span>
                        <h3 className="mt-3 text-xl font-semibold text-foreground">{post.title}</h3>
                      </div>
                      <p className="shrink-0 text-sm text-muted-foreground">{post.time}</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {post.author} · {post.likes} likes · {post.comments.length} replies
                    </p>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <p className="text-base leading-relaxed text-foreground" style={{ fontSize: "17px", lineHeight: 1.47 }}>
                      {post.content}
                    </p>

                    {/* Actions - Apple Pill Style */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-transform active:scale-95"
                      >
                        <Heart className="size-4" />
                        Like
                      </button>
                      <button
                        onClick={() => handleBookmark(post.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-transform active:scale-95"
                      >
                        <Bookmark className={`size-4 ${post.bookmarked ? "fill-primary text-primary" : ""}`} />
                        {post.bookmarked ? "Saved" : "Save"}
                      </button>
                    </div>

                    {/* Comments */}
                    <div className="mt-6 border-t border-border/60 pt-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Comments
                      </p>
                      <div className="mt-4 space-y-2">
                        {post.comments.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-border bg-secondary/50 p-4 text-center">
                            <p className="text-sm text-muted-foreground">
                              No comments yet. Be the first to reply.
                            </p>
                          </div>
                        ) : (
                          post.comments.map((comment, idx) => (
                            <div key={idx} className="rounded-xl bg-secondary p-4">
                              <p className="text-sm text-foreground">{comment}</p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Comment Input */}
                      <div className="mt-4 flex gap-3">
                        <input
                          value={commentDrafts[post.id] ?? ""}
                          onChange={(e) =>
                            setCommentDrafts((c) => ({ ...c, [post.id]: e.target.value }))
                          }
                          placeholder="Write a comment..."
                          className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-transform active:scale-95"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer - Apple Parchment Style */}
      <footer className="border-t border-border/60 bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Community. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <button className="text-xs text-primary transition-colors hover:text-primary/80">
              Privacy Policy
            </button>
            <button className="text-xs text-primary transition-colors hover:text-primary/80">
              Terms of Service
            </button>
            <button className="text-xs text-primary transition-colors hover:text-primary/80">
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
