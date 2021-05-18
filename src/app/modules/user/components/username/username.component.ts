import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';

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

  onFocusOut($event) { if(this.email) this.error = this.validateService.validateEmail(this.email.toLowerCase()); }

}
