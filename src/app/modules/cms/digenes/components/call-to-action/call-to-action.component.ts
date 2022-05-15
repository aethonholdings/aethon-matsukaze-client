import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'matsukaze-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss']
})
export class CallToActionComponent implements OnInit {
  action: Observable<boolean>;
  src: Observable<string>;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.action = this.translate.get('content.home.news.action').pipe(
      map(text => {
        if(text) return true;
        return false;
      })
    )
    this.src = this.translate.get('content.home.news.img');
  }

}
