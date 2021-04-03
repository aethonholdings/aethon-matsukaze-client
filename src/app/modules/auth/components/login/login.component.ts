import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


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
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.login$(this.email, this.password).subscribe(response => {
      if(response) {
        this.error = false;
        this.router.navigateByUrl(this.authService.getRedirectUrl());
      }
      else {
        this.error = true;
      }
    })
  }

  onChangeState(state: string) { this.state.emit(state); }

}
