import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'matsukaze-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {

  @Input() email: string;
  @Output() emailChange = new EventEmitter<string>();
  emailTxtBox: string;
  error: string;

  constructor() { }

  ngOnInit(): void {}

  public validateEmail() {
    if(this.emailTxtBox) {
      var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if(re.test(this.emailTxtBox)) {
        this.error = null;
        this.emailChange.emit(this.emailTxtBox.toLowerCase());
      } else {
        this.error = "auth.widgets.username.error.invalidEmail";
        this.emailChange.emit(null);
      };
    } else {
      this.error = null;
      this.emailChange.emit(null);
    }
  }

}
