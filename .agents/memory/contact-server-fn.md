---
name: Contact server fn import protection
description: createServerFn files must NOT use .server.ts naming or they get blocked client-side
---

The TanStack Start import-protection plugin blocks any `*.server.*` file from being imported in client routes, even if the file exports a `createServerFn` (which is designed to be called from the client).

**Why:** `createServerFn` creates an RPC bridge and IS meant to be imported on the client. But the `.server.ts` filename pattern triggers the plugin before that distinction is checked.

**How to apply:** Name createServerFn files without `.server.` in the filename (e.g., `contactSubmit.ts` not `contactSubmit.server.ts`). The RPC bridging still works correctly — only the filename needs to change.
