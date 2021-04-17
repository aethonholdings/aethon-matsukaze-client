import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';

@Component({
  selector: 'matsukaze-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.scss']
})
export class PasswordCheckerComponent implements OnInit {

  @Input() password: string;
  verifyPassword: string;
  error: string;

  @Output() passwordChange = new EventEmitter<string>()

  constructor(private validateService: ValidateService) { }

  ngOnInit(): void {
  }

  onPasswordChange() {
    this.error = this.validateService.comparePasswords({
      password: this.password,
      verifyPassword: this.verifyPassword
    })
    if(!this.error) this.passwordChange.emit(this.password)
  }

}
