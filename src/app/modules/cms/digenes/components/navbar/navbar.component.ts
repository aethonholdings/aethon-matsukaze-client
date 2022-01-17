import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() page: string;
  lang: string = null;

  constructor() {}

  ngOnInit(): void {}

  onChangeLang(lang: string) {
    this.lang = lang;
  }

}
