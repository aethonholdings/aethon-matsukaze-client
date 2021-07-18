import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../services/user/user.service';

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
    private spinner: NgxSpinnerService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    this.spinner.show();
    const params = { email: this.email, password: this.password }
    this.error = this.validateParams();
    if(!this.error) {
      this.spinner.show();
      console.log(this.translateService.getBrowserLang());
      this.userService.login$(this.email, this.password, this.translateService.currentLang).subscribe(response => {
        if(response) {
          this.router.navigateByUrl(this.userService.getRedirectUrl());
        }
        else {
          this.error = "auth.flows.login.form.errors.invalidLogin";
          this.password = null;
        }
        this.spinner.hide();
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
