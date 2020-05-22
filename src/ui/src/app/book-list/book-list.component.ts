import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [
    trigger('scale', [
      state('in', style({ transform: 'scale(1)' })),
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ transform: 'scale(0)' }))
      ]),
    ])
  ]
})
export class BookListComponent implements OnInit {
  @Input() state: string;
  @Input() books: Book[] = [];

  constructor(private booksService: BookService) { }

  ngOnInit(): void {
  }
}
