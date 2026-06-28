# news-backend

Firebase-backed backend testing ground for a news/media platform. Currently a monolith of React components used to exercise Firestore CRUD and Firebase Auth — will be replaced with a proper frontend.

---

## Project Structure

```
src/
  main.tsx                  React entry point
  App.tsx                   Root component
  App.css                   Component styles (forms, articles, comments)
  index.css                 Global styles, CSS variables, dark mode

  AddUser.tsx               Create user form (Firestore + Auth)
  CreatePosts.tsx           Create article form
  Login.tsx                 Login / logout with auth state
  ArticleViewer.tsx         Article list viewer with per-article comment box

  models/
    User.ts                 UserProps interface + createUser / transform
    Article.ts              ArticleProps interface + createArticle / transform
    Comment.ts              CommentProps interface + createComment / transform

  services/
    firebase.ts             Firebase app initialization (Firestore + Auth)
    AuthService.ts          login, logout, getCurrentUser, doOnAuthStateChange
    UserService.ts          setUser, getUserById, getAllUsers
    ArticleService.ts       createPost, updatePostById, getPostById, getAllPosts
    CommentService.ts       addComment

  assets/
    hero.png, react.svg, vite.svg

Root orphan files (not imported anywhere):
  Comment.ts                Duplicate / draft model file
  all                       Duplicate of src/models/Comment.ts
```

---

## Data Models

### User (`src/models/User.ts`)
| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Firestore doc ID / Auth UID |
| `email` | `string` | |
| `role` | `'ADMIN' \| 'JOURNALIST' \| 'READER'` | Defaults to `'READER'` |
| `displayName` | `string` | Defaults to email username |
| `createdAt` | `Timestamp \| FieldValue` | `serverTimestamp()` |
| `modifiedAt` | `Timestamp \| FieldValue` | `serverTimestamp()` |

### Article (`src/models/Article.ts`)
| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Firestore doc ID |
| `creatorId` | `string` | Auth UID of creator |
| `title` | `string` | |
| `content` | `string` | |
| `tags` | `string[]` | |
| `status` | `'PUBLISHED' \| 'DRAFT'` | Defaults to `'DRAFT'` |
| `imageURL?` | `string` | Optional — no upload mechanism yet |
| `createdAt` | `Timestamp \| FieldValue` | `serverTimestamp()` |
| `modifiedAt` | `Timestamp \| FieldValue` | `serverTimestamp()` |

### Comment (`src/models/Comment.ts`)
| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Firestore doc ID |
| `articleId` | `string` | Parent article |
| `userId` | `string` | Author UID |
| `replyTargetId?` | `string` | Optional in interface, required by `createComment` |
| `content` | `string` | |
| `createdAt` | `Timestamp` | **Not set by `createComment`** — see gaps |

---

## Services & Exports

### AuthService
| Function | Description |
|---|---|
| `login(email, password)` | Firebase `signInWithEmailAndPassword` |
| `logout()` | Firebase `signOut` |
| `getCurrentUser()` | Returns `auth.currentUser` or `null` |
| `doOnAuthStateChange(callback)` | Wraps `onAuthStateChanged` |

### UserService
| Function | Description |
|---|---|
| `setUser(data, password)` | Creates Auth account + Firestore user doc |
| `getUserById(id)` | Reads single user doc (uses `transform`) |
| `getAllUsers()` | Reads all user docs (no `transform`) |

### ArticleService
| Function | Description |
|---|---|
| `createPost(data)` | Validates via `createArticle`, adds doc |
| `updatePostById(id, data)` | Validates via `createArticle`, updates doc |
| `getPostById(id)` | Reads single article (uses `transform`) |
| `getAllPosts()` | Reads all articles (no `transform`) |

### CommentService
| Function | Description |
|---|---|
| `addComment(data)` | Validates via `createComment`, adds doc |

---

## Validation (Where It Exists)

All validation lives in the model files' `create*` functions and throws `Error` with a `REQUIRED:` prefix.

### Model-level guards (throw on missing required fields)

| Model | `create*` requires | `transform` requires |
|---|---|---|
| **User** | `email` | `id`, `createdAt`, `modifiedAt` |
| **Article** | `creatorId`, `title`, `content` | `id`, `createdAt` |
| **Comment** | `articleId`, `userId`, `replyTargetId`, `content` | `id`, `createdAt` |

### Service-level error handling
- `UserService.setUser` / `ArticleService.createPost` wrap Firestore calls in try/catch and rethrow with context.

### Component-level guards
- `ArticleViewer.handleCommentSubmit` silently returns if content is empty or user is not logged in.
- `Login.handleSubmit` shows `alert` on failure.
- Form disabled states: `CreatePosts` and `ArticleViewer` disable inputs when not authenticated.

### What is NOT validated
- **No role-based checks** — `User.role` (`ADMIN`, `JOURNALIST`, `READER`) is stored but never enforced anywhere.
- **No email verification** — Firebase Auth email verification is never triggered or checked.
- **No route guards** — `react-router-dom` is installed but unused; all components render unconditionally.
- **No input sanitization** — content is passed as-is to Firestore.
- **No rate limiting or ownership checks** — any user can create articles, comment on any article, or create new users.

---

## Known Gaps & Issues

### Missing CRUD Operations
| Operation | Status |
|---|---|
| Update / delete user | Missing — only `setUser` / `getUserById` exist |
| Delete article | Missing — only `create` / `read` / `update` exist |
| Read / update / delete comments | Missing — only `addComment` exists |
| `getCommentsByArticleId` | Missing — needed to display comments under articles |
| `storage` (Firebase) | Not initialized — `imageURL` field on articles cannot be used |

### Model / Type Issues
- **`CommentProps` is not exported** — consumers cannot type-check comment data.
- **`createComment` never sets `createdAt`** — unlike `User`/`Article` models, no `serverTimestamp()` is assigned, yet `transform` requires it. Freshly created comments cannot be read back through `transform`.
- **`replyTargetId` inconsistency** — optional in the `CommentProps` interface but required by `createComment`.
- **`getAllPosts` / `getAllUsers` skip `transform`** — unlike their singular counterparts, they return raw Firestore data.
- **`CommentService.addComment` uses an inline type** — inconsistent with other services that use `Partial<...>` from the model.

### Unused Dependencies
- **`lucide-react`** — installed, zero imports.
- **`react-router-dom`** — installed, zero imports.

### Orphaned Root Files
- `Comment.ts` and `all` — draft/duplicate model files, not imported anywhere.

### Firestore Security
- Rules are **wide open** (any read/write) until July 26, 2026, then **deny all**. No per-collection or per-role rules.

---

## Firebase Config

- **Project:** `new-media-fst`
- **Provider:** `asia-southeast1`
- **Auth:** Email/password only
- **Storage:** Bucket configured but `getStorage()` never called
- **Hosting:** SPA rewrite to `index.html`

---

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + Vite build |
| `npm run lint` | Run oxlint |
| `npm run preview` | Preview production build |
