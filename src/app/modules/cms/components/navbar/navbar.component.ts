import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/model/model';
import { UserService } from 'src/app/modules/user/services/user/user.service';

@Component({
  selector: 'matsukaze-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() page: string;
  user: User = null;
  lang: string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private authService: UserService,
    private router: Router,
    private titleService: Title,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.activatedRoute.queryParamMap.subscribe(queryParamMap => {
      if(queryParamMap?.get("lang")) {
        this.lang = queryParamMap?.get("lang");
      } else {
        this.lang = this.translate.getBrowserLang()
      }
      this.translate.use(this.lang); ;
      this.translateService.get("title").subscribe(title => {
        this.titleService.setTitle(title);
      });
    });
    this.authService.getUser$().subscribe(user => { this.user = user });
  }

  onChangeLang(lang: string) {
    this.lang = lang;
    this.activatedRoute.url.subscribe(url => {
      this.router.navigate(url, {
        queryParams: {lang: this.lang},
        queryParamsHandling: 'merge'
      })
    })
  }

}
