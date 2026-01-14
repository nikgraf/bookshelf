"use client";

import { useState, useEffect, Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { BookCard } from "@/components/book-card";
import { type Book, getMyBooks, removeBook } from "@/lib/books";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function MyBooksContent() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookToRemove, setBookToRemove] = useState<Book | null>(null);

  useEffect(() => {
    setBooks(getMyBooks());
  }, []);

  const handleRemoveClick = (book: Book) => {
    setBookToRemove(book);
  };

  const handleConfirmRemove = () => {
    if (bookToRemove) {
      removeBook(bookToRemove.key);
      setBooks(getMyBooks());
      setBookToRemove(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Books</h1>

        {books.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            You haven&#39;t saved any books yet. Go to Search to find some!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                isSaved={true}
                onToggleSave={handleRemoveClick}
              />
            ))}
          </div>
        )}

        <AlertDialog
          open={bookToRemove !== null}
          onOpenChange={(open) => !open && setBookToRemove(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove book?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove &quot;{bookToRemove?.title}&quot;
                from your books? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmRemove}>
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}

export default function MyBooksPage() {
  return (
    <Suspense fallback={null}>
      <MyBooksContent />
    </Suspense>
  );
}
