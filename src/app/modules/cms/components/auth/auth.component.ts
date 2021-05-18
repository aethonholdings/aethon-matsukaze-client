import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'matsukaze-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  state: string = "login";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.url[0]?.path) {
      this.state=this.route.snapshot.url[0]?.path;
    }
  }

  onChangeState($event: any) {
    this.router.navigate(['auth', $event], { queryParamsHandling: "preserve" });
  }

}
