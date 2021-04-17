import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'matsukaze-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {

  @Input() email: string;
  @Output() emailChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {}

  onChange($event) { this.emailChange.emit(this.email); }

}
