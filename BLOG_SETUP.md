# Blog Setup Instructions

## Current Status

Your blog dynamic routes have been **temporarily disabled** to allow the site to build and deploy successfully. This was necessary because Next.js static export requires at least one page for each dynamic route, and currently all blog posts are in the `staging` folder.

## What Was Changed

The following folders were renamed to disable them:
- `src/app/blog/posts/[...slug]` → `src/app/blog/posts/_disabled_slug`
- `src/app/blog/series/[series]` → `src/app/blog/series/_disabled_series`
- `src/app/blog/tag/[tag]` → `src/app/blog/tag/_disabled_tag`

## How to Re-enable the Blog

When you're ready to publish your blog posts, follow these steps:

### 1. Move Posts Out of Staging

```bash
# Move your posts from staging to the main posts directory
mv src/app/blog/posts/staging/*.md src/app/blog/posts/
```

### 2. Re-enable Dynamic Routes

```bash
# Rename the disabled folders back to their original names
mv src/app/blog/posts/_disabled_slug "src/app/blog/posts/[...slug]"
mv src/app/blog/series/_disabled_series "src/app/blog/series/[series]"
mv src/app/blog/tag/_disabled_tag "src/app/blog/tag/[tag]"
```

### 3. Test Locally

```bash
npm run build
```

### 4. Commit and Push

```bash
git add .
git commit -m "Enable blog with published posts"
git push
```

The GitHub Actions workflow will automatically build and deploy your site!

## Current Staging Posts

You have the following posts in staging:
- `infinity-infinity.md`
- `Intro-To-Logic.md`

When you move these out of staging, they'll be automatically included in the build.

## Note

The main blog page (`/blog`) is still active and will show "No blog posts yet" until you publish posts and re-enable the dynamic routes.
