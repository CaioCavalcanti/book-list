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
  isLoading = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  startReading(): void {
    this.update('reading');
  }

  stopReading(): void {
    this.update('shelved');
  }

  finish(): void {
    this.update('finished');
  }

  remove(): void {
    this.bookService.delete(this.book.isbn);
  }

  update(newState: string): void {
    const book = { ...this.book };
    book.state = newState;
    this.bookService.update(book);
  }
}
