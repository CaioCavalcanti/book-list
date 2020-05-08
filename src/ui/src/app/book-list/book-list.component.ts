import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  constructor() { }

  ngOnInit(): void {
    this.newBook();
  }

  newBook(): void {
    setTimeout(() => {
      const newBook = this.getBook();
      this.books.push(newBook);
      if (this.books.length < 5) {
        this.newBook();
      }
    }, 3000);
  }

  removeBook(bookId: string): void {
    this.books = this.books.filter(book => book.id != bookId);
  }

  getBook(): Book {
    const bookId = (this.books.length + 1).toString();
    return {
      id: bookId,
      title: `Book ${bookId}`,
      author: "Caio Cavalcanti",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  }
}
