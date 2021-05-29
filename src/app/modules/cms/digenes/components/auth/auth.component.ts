import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  state: string = "login";

  constructor() { }

  ngOnInit(): void {
    // if(this.route.snapshot.url[0]?.path) {
    //   this.state=this.route.snapshot.url[0]?.path;
    // }
  }

  onChangeState($event: any) {
    // this.router.navigate(['auth', $event], { queryParamsHandling: "preserve" });
  }

}
