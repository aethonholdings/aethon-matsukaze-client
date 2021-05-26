import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../services/user/user.service';
import { ValidateService } from '../../../services/validate/validate.service';


@Component({
  selector: 'matsukaze-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error: string = null;
  @Output() state = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private router: Router,
    private validateService: ValidateService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {}

  onLogin() {
    this.spinner.show();
    const params = { email: this.email, password: this.password }
    this.error = this.validateParams();
    if(!this.error) {
      this.userService.login$(this.email, this.password).subscribe(response => {
        if(response) {
          this.router.navigateByUrl(this.userService.getRedirectUrl());
        }
        else {
          this.error = "auth.flows.login.form.errors.invalidLogin";
        }
      })
    }
    this.spinner.hide();
  }

  validateParams(): string {
    if(!this.email || !this.password) return "auth.flows.login.form.errors.noCredentials"
    return null
  }

  onChangeState(state: any) { this.state.emit(state); }

}
