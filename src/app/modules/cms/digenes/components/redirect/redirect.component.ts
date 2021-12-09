import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.location.href = "https://jemmacomics.com/digenhs-i-to-simadi-tou-kain-preorder";
  }

}
