---
name: TanStack Start createServerFn API
description: Correct chaining API for createServerFn in TanStack Start v1.167+
---

In TanStack Start v1.167+ (tested on 1.168.6), the method for input validation is `.inputValidator()`, NOT `.validator()`.

**Why:** The public-facing `.validator()` method was renamed/removed. Calling it throws `TypeError: createServerFn(...).validator is not a function` at runtime.

**How to apply:** Any time you write or see `.validator(...)` on a createServerFn chain, replace it with `.inputValidator(...)`.

```ts
// WRONG:
createServerFn({ method: "POST" })
  .validator((data: unknown) => data as MyType)
  .handler(async ({ data }) => { ... })

// CORRECT:
createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as MyType)
  .handler(async ({ data }) => { ... })
```
