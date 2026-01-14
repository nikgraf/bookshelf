"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type Book, getCoverUrl } from "@/lib/books"
import { cn } from "@/lib/utils"

interface BookCardProps {
  book: Book
  isSaved: boolean
  onToggleSave: (book: Book) => void
}

export function BookCard({ book, isSaved, onToggleSave }: BookCardProps) {
  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={getCoverUrl(book.coverId) || "/placeholder.svg"}
            alt={`Cover of ${book.title}`}
            className="w-full h-48 object-cover bg-muted"
          />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background",
              isSaved && "text-yellow-500 hover:text-yellow-600",
            )}
            onClick={() => onToggleSave(book)}
          >
            <Star className={cn("h-5 w-5", isSaved && "fill-current")} />
            <span className="sr-only">{isSaved ? "Remove from" : "Add to"} my books</span>
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm line-clamp-2 leading-tight">{book.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{book.author}</p>
        </div>
      </CardContent>
    </Card>
  )
}
