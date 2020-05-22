import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isSearching = false;
  results: Book[];
  title: string;
  titleChanged: Subject<string> = new Subject<string>();

  constructor(private bookService: BookService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.titleChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(title => this.search(title));
  }

  changed(title: string): void {
    this.isSearching = title ? true : false;
    this.titleChanged.next(title);
  }

  search(title: string): void {
    if (!title) return;
    this.isSearching = true;
    this.bookService.search(title)
      .subscribe(
        (results: Book[]) => this.results = results,
        (error: any) => {
          this.results = [];
          this.showNotification('Could not search books')
        }
      )
      .add(() => this.isSearching = false);
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", { duration: 5000 });
  }
}
