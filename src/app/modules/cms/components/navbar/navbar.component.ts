import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private authService: UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParamMap => {
      const lang = queryParamMap?.get("lang");
      if(lang) this.translate.use(lang);
    });
    this.authService.getUser$().subscribe(user => { this.user = user });
  }

  onChangeLang(lang: string) { this.translate.use(lang); }

}
