export interface Book {
  key: string
  title: string
  author: string
  coverId: number | null
}

export interface OpenLibraryDoc {
  key: string
  title: string
  author_name?: string[]
  cover_i?: number
}

export interface OpenLibraryResponse {
  docs: OpenLibraryDoc[]
}

const STORAGE_KEY = "my-bookshelf"

export function getMyBooks(): Book[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveBook(book: Book): void {
  const books = getMyBooks()
  if (!books.find((b) => b.key === book.key)) {
    books.push(book)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  }
}

export function removeBook(key: string): void {
  const books = getMyBooks().filter((b) => b.key !== key)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

export function isBookSaved(key: string): boolean {
  return getMyBooks().some((b) => b.key === key)
}

export function getCoverUrl(coverId: number | null, size: "S" | "M" | "L" = "M"): string {
  if (!coverId) return "/abstract-book-cover.png"
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}
