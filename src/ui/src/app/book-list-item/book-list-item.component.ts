import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss']
})
export class BookListItemComponent implements OnInit {
  @Input() book: Book;
  @Output() bookMarkedAsReadEvent = new EventEmitter<string>();
  @Output() bookRemovedEvent = new EventEmitter<string>();
  isLoading = false;

  constructor(private bookService: BookService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  markAsRead(): void {
    this.bookMarkedAsReadEvent.emit(this.book.isbn);
  }

  remove(): void {
    this.isLoading = true;
    this.bookService.deleteBook(this.book.isbn)
      .subscribe(
        (data: any) => this.bookRemovedEvent.emit(this.book.isbn),
        (error: any) => this.showNotification("Could not remove book")
      )
      .add(() => this.isLoading = false);
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", { duration: 5000 });
  }
}
