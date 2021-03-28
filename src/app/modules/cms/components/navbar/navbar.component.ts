import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/model/model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'matsukaze-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() page: string;
  @Input() user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParamMap => {
      const lang = queryParamMap?.get("lang");
      if(lang) this.translate.use(lang);
    });
    this.user = this.apiService.getUser();
  }

  onChangeLang(lang: string) { this.translate.use(lang); }

}
