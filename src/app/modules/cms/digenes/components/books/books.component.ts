import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: any[][] = [["1", "2"], ["3", "4"], ["5", null]];

  constructor() { }

  ngOnInit(): void {
  }

}
