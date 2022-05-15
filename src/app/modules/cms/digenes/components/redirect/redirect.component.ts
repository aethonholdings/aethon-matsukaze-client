import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'matsukaze-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let path: string = "";
    this.route.queryParams
      .subscribe(params => {
        path = params.path;
        if(path) window.location.href = "https://jemmacomics.com/" + path;
        else window.location.href = "https://jemmacomics.com/index.php?route=product/search&search=%CE%B4%CE%B9%CE%B3%CE%B5%CE%BD%CE%AE%CF%82";
      }
    );
  }
}
