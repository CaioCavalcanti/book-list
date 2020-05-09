import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [
    trigger('scale', [
      state('in', style({ transform: 'scale(1)' })),
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ transform: 'scale(0)' }))
      ]),
    ])
  ]
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
