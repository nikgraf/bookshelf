"use client";

import type React from "react";
import { useState, useEffect, Suspense } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { BookCard } from "@/components/book-card";
import {
  type Book,
  type OpenLibraryResponse,
  saveBook,
  removeBook,
  isBookSaved,
} from "@/lib/books";

function SearchContent() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const keys = new Set(books.map((b) => b.key).filter(isBookSaved));
    setSavedKeys(keys);
  }, [books]);

  const searchBooks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
      );
      const data: OpenLibraryResponse = await res.json();

      const results: Book[] = data.docs.map((doc) => ({
        key: doc.key,
        title: doc.title,
        author: doc.author_name?.[0] || "Unknown author",
        coverId: doc.cover_i || null,
      }));

      setBooks(results);
    } catch (error) {
      console.error("Failed to search books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSave = (book: Book) => {
    if (savedKeys.has(book.key)) {
      removeBook(book.key);
      setSavedKeys((prev) => {
        const next = new Set(prev);
        next.delete(book.key);
        return next;
      });
    } else {
      saveBook(book);
      setSavedKeys((prev) => new Set(prev).add(book.key));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto mb-8">
          <form onSubmit={searchBooks} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>

        {loading && (
          <div className="text-center text-muted-foreground">
            Searching for books...
          </div>
        )}

        {!loading && searched && books.length === 0 && (
          <div className="text-center text-muted-foreground">
            No books found. Try a different search term.
          </div>
        )}

        {!loading && books.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                isSaved={savedKeys.has(book.key)}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        )}

        {!searched && (
          <div className="text-center text-muted-foreground">
            Search for books to get started
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  );
}
