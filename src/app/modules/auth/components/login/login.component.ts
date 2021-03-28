import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'matsukaze-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error: boolean = false;
  @Output() state = new EventEmitter<string>()

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.dataService.login$(this.email, this.password).subscribe(response => {
      if(response) {
        this.error = false;
        this.router.navigateByUrl(this.dataService.getRedirectUrl());
      }
      else {
        this.error = true;
      }
    })
  }

  onChangeState(state: string) { this.state.emit(state); }

}
