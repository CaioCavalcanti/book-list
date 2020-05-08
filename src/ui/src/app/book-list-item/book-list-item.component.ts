import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss']
})
export class BookListItemComponent implements OnInit {
  @Input() book: Book;
  @Output() bookMarkedAsReadEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  markAsRead(): void {
    this.bookMarkedAsReadEvent.emit(this.book.id);
  }
}
