import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'matsukaze-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() page: string;
  lang: string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {}

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
