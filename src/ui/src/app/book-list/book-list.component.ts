import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLoading: boolean = true;

  constructor(private booksService: BookService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.booksService.getBooks()
      .subscribe(
        (books: Book[]) => this.books = books,
        (error: any) => this.showNotification("Could not load books")
      )
      .add(() => this.isLoading = false);
  }

  removeBook(bookId: string): void {
    const bookToRemove = this.books.find(book => book.id == bookId);
    this.books = this.books.filter(book => book.id != bookId);
    this.showNotification(`Book '${bookToRemove.title}' marked as read`);
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", { duration: 5000});
  }
}
