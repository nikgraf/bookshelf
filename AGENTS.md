# AGENTS.md

Next.js bookshelf app that searches Open Library API and saves books to localStorage.

## Development Commands

**Package manager**: pnpm (use `pnpm install`, `pnpm add <pkg>`, etc.)

### Quality Checks (run after every change)

```bash
pnpm lint       # ESLint linting
pnpm format:check # Prettier check (no changes, exits with error if unformatted)
pnpm build      # Build the app
```

### Commands to fix issues

```bash
pnpm lint:fix   # ESLint linting with auto-fix
pnpm format     # Prettier formatting (writes changes)
```

## Key Files

- `app/page.tsx` - Search page
- `app/my-books/page.tsx` - Saved books page
- `lib/books.ts` - Book storage functions (localStorage key: `"my-bookshelf"`)
- `components/book-card.tsx` - Book card component
- `components/ui/` - UI component library (Radix UI)

## Data Model

```typescript
interface Book {
  key: string;
  title: string;
  author: string;
  coverId: number | null;
}
```

## Important Notes

- **Client-side only**: Use `"use client"` for components using localStorage
- **No backend**: All data in localStorage
- **Use existing UI components** from `components/ui/` when possible
- **Book storage**: All functions in `lib/books.ts`
