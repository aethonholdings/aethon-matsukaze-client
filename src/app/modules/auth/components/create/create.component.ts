import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ValidateService } from '../../services/validate/validate.service';

@Component({
  selector: 'matsukaze-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  email: string;
  password: string;
  verifyPassword: string;
  error: string = null;
  @Output() state = new EventEmitter<string>()

  constructor(private validateService: ValidateService, private authService: AuthService) {}

  ngOnInit(): void {}

  onCreate() {
    const params: any = {
      email: this.email,
      password: this.password,
      verifyPassword: this.verifyPassword
    }
    this.error = this.validateService.validateParams(params)
    if(!this.error) {
      this.authService.create$(params).subscribe(response => {
        console.log(response);
      })
    }
  }

  onChangeState(state: string) { this.state.emit(state); }

  onPasswordChange() {
    this.error = this.validateService.comparePasswords({
      password: this.password,
      verifyPassword: this.verifyPassword
    })
  }
}
