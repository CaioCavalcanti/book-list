import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private booksService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.booksService.getBooks()
      .subscribe((books: Book[]) => this.books = books);
  }

  removeBook(bookId: string): void {
    this.books = this.books.filter(book => book.id != bookId);
  }
}
