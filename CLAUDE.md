# Repository Instructions

## API Size

When updating code that may affect the package API, build output, module structure, or bundle size, run:

```bash
pnpm build
pnpm size
```

The `pnpm size` command updates the API Size data in all generated documentation. Include those changes in the same update and do not edit the generated size tables manually.
