import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/modules/user/services/user/user.service';

@Component({
  selector: 'matsukaze-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lang: string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(
      mergeMap(queryParamMap => {
        if(queryParamMap?.get("lang") && queryParamMap.get("lang")!=this.userService.getLanguage()) {
          this.lang = queryParamMap.get("lang");
          this.userService.setLanguage(this.lang);
        }
        return this.translateService.get("title")
      })
    ).subscribe(title => {
      this.titleService.setTitle(title);
    })
  }

}
