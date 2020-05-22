import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  reading$: Observable<Book[]>;
  upNext$: Observable<Book[]>;
  finished$: Observable<Book[]>;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.reading$ = this.bookService.books.pipe(
      map(books => books.filter(book => book.state === 'reading'))
    );
    this.upNext$ = this.bookService.books.pipe(
      map(books => books.filter(book => book.state === 'shelved'))
    );
    this.finished$ = this.bookService.books.pipe(
      map(books => books.filter(book => book.state === 'finished'))
    );

    this.bookService.getAll();
  }

}
