import { Component, Input, OnInit } from '@angular/core';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParamMap => {
      this.lang = queryParamMap?.get("lang");
      if(this.lang) this.translate.use(this.lang); else this.lang = "en"
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
