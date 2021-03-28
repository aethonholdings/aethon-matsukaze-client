import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  state: string = "login";

  constructor() { }

  ngOnInit() { }

  onChangeState($event: any) { this.state = $event; }

}
