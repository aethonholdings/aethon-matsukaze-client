import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/model/model';
import { DataService } from 'src/app/services/data/data.service';

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
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParamMap => {
      const lang = queryParamMap?.get("lang");
      if(lang) this.translate.use(lang);
    });
    this.user = this.dataService.getUser();
  }

  onChangeLang(lang: string) { this.translate.use(lang); }

}
