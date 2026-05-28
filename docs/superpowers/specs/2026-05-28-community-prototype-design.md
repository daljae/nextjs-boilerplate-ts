# Community Prototype Design

**Date:** 2026-05-28
**Status:** Approved

## Overview

Build a logged-in-only community home screen inspired by a Naver Cafe-style feed. The first version is a prototype, so posts and comments live in client state instead of a database, but the UI should feel like a real community landing page.

## Goals

- Require authentication before showing the community screen.
- Present a single community home page with notices, popular posts, a writing box, and a feed.
- Support inline post creation and inline comment creation.
- Keep the layout responsive and visually distinctive.

## Out of Scope

- Persistent storage
- File uploads
- Search
- Moderation tools
- Nested comment threads

## Page Structure

- Header: community title, short description, sign-out action, and membership stats.
- Left content area: notices and popular posts.
- Main content area: inline post composer and post feed.
- Each post card: metadata, content, actions, and inline comment composer.

## Interaction Model

- Creating a post prepends it to the feed immediately.
- Adding a comment updates the selected post immediately.
- Like/bookmark actions are local prototype interactions only.
- Empty submissions are ignored.

## Styling Direction

- Warm editorial layout with layered cards, soft gradients, and subtle borders.
- Strong typographic hierarchy for notices and popular posts.
- Mobile-first stacking with a single-column layout on smaller screens.

## Validation

- Signed-out users only see the login CTA.
- Signed-in users can create posts and comments locally.
- The page renders without database writes.
