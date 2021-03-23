import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'matsukaze-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() page: string = "";

  constructor(private activatedRoute: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParamMap => {
      const lang = queryParamMap?.get("lang");
      if(lang) this.translate.use(lang);
    });
  }

  onChangeLang(lang: string) { this.translate.use(lang); }

}
