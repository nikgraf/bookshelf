"use client"

import { useState, useEffect, Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { BookCard } from "@/components/book-card"
import { type Book, getMyBooks, removeBook } from "@/lib/books"

function MyBooksContent() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    setBooks(getMyBooks())
  }, [])

  const handleRemove = (book: Book) => {
    removeBook(book.key)
    setBooks(getMyBooks())
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Books</h1>

        {books.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            You haven't saved any books yet. Go to Search to find some!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map((book) => (
              <BookCard key={book.key} book={book} isSaved={true} onToggleSave={handleRemove} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default function MyBooksPage() {
  return (
    <Suspense fallback={null}>
      <MyBooksContent />
    </Suspense>
  )
}
