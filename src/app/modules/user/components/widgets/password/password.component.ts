import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'matsukaze-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  @Input() password: string;
  @Output() passwordChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  onChange($event) { this.passwordChange.emit(this.password); }

}
