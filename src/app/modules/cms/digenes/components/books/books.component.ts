import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'matsukaze-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: any[][] = [
    [
      {count: 1, sample: true},
      {count: 2}
    ],
    [
      {count: 3},
      {count: 4}
    ],
    [
      {count: 5},
      {count: 6}
    ]
  ];

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {}

}
