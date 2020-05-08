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

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.booksUrl);
  }
}
