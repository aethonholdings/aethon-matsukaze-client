import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'matsukaze-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.scss']
})
export class PasswordCheckerComponent implements OnInit {

  @Input() password: string;
  passwordTxtBox: string;
  verifyPasswordTxtBox: string;
  passwordError: string;
  verifyPasswordError: string;

  @Output() passwordChange = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void { }

  onPasswordFocusOut(): void {
    if(this.passwordTxtBox && this.passwordTxtBox.length<8) {
      this.passwordError = "auth.widgets.password-checker.error.length";
    } else {
      this.passwordError = null;
    }
    this.emit();
  }

  onVerifyPasswordChange(): void {
    if(this.passwordTxtBox && this.verifyPasswordTxtBox && this.passwordTxtBox!=this.verifyPasswordTxtBox) {
      this.verifyPasswordError = "auth.widgets.password-checker.error.noMatch";
    } else {
      this.verifyPasswordError = null;
    }
    this.emit();
  }

  emit(): void {
    if(this.passwordTxtBox && this.verifyPasswordTxtBox && !this.passwordError && !this.verifyPasswordError) {
      this.passwordChange.emit(this.passwordTxtBox);
    } else {
      this.passwordChange.emit(null);
    };
  }
}
