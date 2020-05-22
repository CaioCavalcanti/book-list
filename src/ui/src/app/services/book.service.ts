import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book } from '../models/book';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  _books = new BehaviorSubject<Book[]>([]);
  booksUrl = `${environment.apiUrl}/books`;
  dataStore: { books: Book[] } = { books: [] };
  readonly books = this._books.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  add(book: Book): void {
    this.http.post<Book>(this.booksUrl, book)
      .subscribe(
        book => {
          this.dataStore.books.push(book);
          this.notifyDataStoreUpdated();
          this.showNotification("Book added");
        },
        error => this.handleError(error, "Could not add book")
      );
  }

  delete(isbn: string): void {
    this.http.delete<any>(`${this.booksUrl}/${isbn}`)
      .subscribe(
        _ => {
          this.dataStore.books.forEach((book, i) => {
            if (book.isbn === isbn) {
              this.dataStore.books.splice(i, 1);
            }
          });
          this.notifyDataStoreUpdated();
          this.showNotification("Book removed");
        },
        error => this.handleError(error, "Could not remove book")
      );
  }

  update(book: Book): void {
    this.http.put<Book>(`${this.booksUrl}/${book.isbn}`, book)
      .subscribe(
        bookUpdated => {
          this.dataStore.books.forEach((b, i) => {
            if (b.isbn === book.isbn) {
              this.dataStore.books[i] = bookUpdated
            }
          });
          this.notifyDataStoreUpdated();
          this.showNotification("Book updated");
        },
        error => this.handleError(error, "Could not update book")
      )
  }

  getAll(): void {
    this.http.get<Book[]>(this.booksUrl)
      .subscribe(
        books => {
          this.dataStore.books = books;
          this.notifyDataStoreUpdated();
        },
        error => this.handleError(error, "Could not load books")
      );
  }

  private notifyDataStoreUpdated(): void {
    this._books.next(Object.assign({}, this.dataStore).books);
  }

  search(title: string): Observable<Book[]> {
    const url = `${this.booksUrl}/search?title=${title}`;
    return this.http.get<Book[]>(url);
  }

  handleError(error: any, message: string): void {
    console.log(error);
    this.showNotification(message);
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", { duration: 5000 });
  }
}
