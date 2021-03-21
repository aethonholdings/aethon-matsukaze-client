import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'matsukaze-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'matsukaze';

  constructor(private translate: TranslateService) {
    let userLang:string = this.translate.getBrowserLang();
    this.translate.setDefaultLang('en');
    this.translate.use(userLang);
  }
}
