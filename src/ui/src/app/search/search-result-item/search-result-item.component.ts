import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss']
})
export class SearchResultItemComponent implements OnInit {
  @Input() result: Book;
  isAdding = false;

  constructor(private bookService: BookService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  add(): void {
    this.isAdding = true;
    this.bookService.addBook(this.result)
      .subscribe(
        (book) => this.result.shelved = true,
        (error: any) => this.showNotification("Could not add book to list")
      )
      .add(() => this.isAdding = false);
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", { duration: 5000 });
  }
}
