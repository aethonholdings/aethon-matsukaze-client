import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { PublicationService } from 'src/app/modules/publication/services/publication.service';

@Component({
  selector: 'matsukaze-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: any[][] = [["1", "2"], ["3", "4"], ["5", "6"]];

  constructor(
    private translateService: TranslateService,
    private publicationService: PublicationService
  ) { }

  ngOnInit(): void {
    // this.publicationService.get$([1]).subscribe(response => {
    //   console.log(response);
    // });
  }

}
