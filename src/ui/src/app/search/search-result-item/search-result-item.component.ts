import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss']
})
export class SearchResultItemComponent implements OnInit {
  @Input() result: Book;
  isShelved = this.result && this.result.state === 'shelved';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  add(): void {
    this.bookService.add(this.result);
  }
}
