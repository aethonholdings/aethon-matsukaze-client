import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'matsukaze-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.scss']
})
export class ViewportComponent implements OnInit {

  viewport = null;
  styleViewport = null;

  constructor() { }

  ngOnInit(): void {
  }

  styleViewport$(viewport): Observable<any> {
    return of(null);
  }

}
