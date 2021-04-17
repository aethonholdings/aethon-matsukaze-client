import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { ValidateService } from '../../services/validate/validate.service';


@Component({
  selector: 'matsukaze-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error: string = null;
  @Output() state = new EventEmitter<string>()

  constructor(
    private authService: UserService,
    private router: Router,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {}

  onLogin() {
    const params = { email: this.email, password: this.password }
    this.error = this.validateService.validateParams(params);
    if(!this.error) {
      this.authService.login$(this.email, this.password).subscribe(response => {
        if(response) {
          this.error = null;
          this.router.navigateByUrl(this.authService.getRedirectUrl());
        }
        else {
          this.error = "Error TBD";
        }
      })
    }
  }

  onChangeState(state: string) { this.state.emit(state); }

}
