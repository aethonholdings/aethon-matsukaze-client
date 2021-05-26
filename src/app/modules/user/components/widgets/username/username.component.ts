import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidateService } from '../../../services/validate/validate.service';

@Component({
  selector: 'matsukaze-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {

  @Input() email: string;
  @Output() emailChange = new EventEmitter<string>();
  error: string;

  constructor(private validateService: ValidateService) { }

  ngOnInit(): void {}

  onChange($event) {
    this.emailChange.emit(this.email.toLowerCase());
    if(!this.email) this.error = null;
  }

  public validateEmail() {
    if(this.email) {
      var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if(re.test(this.email)) this.error = null; else this.error = "auth.widgets.username.error.invalidEmail";
    }
  }

}
