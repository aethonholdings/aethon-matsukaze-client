import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'matsukaze-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: any[][] = [[1, 2], [3, 4], [5, 6]];

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {}

}
