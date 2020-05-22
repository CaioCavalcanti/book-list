import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  booksUrl = `${environment.apiUrl}/books`;

  constructor(private httpClient: HttpClient) { }

  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.booksUrl, book);
  }

  deleteBook(isbn: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.booksUrl}/${isbn}`);
  }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.booksUrl);
  }

  search(title: string): Observable<Book[]> {
    const url = `${this.booksUrl}/search?title=${title}`;
    return this.httpClient.get<Book[]>(url);
  }
}
