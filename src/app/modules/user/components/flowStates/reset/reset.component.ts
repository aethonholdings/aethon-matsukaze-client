import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'matsukaze-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  @Output() state = new EventEmitter<string>();
  error: string = null;

  constructor() { }

  ngOnInit(): void {
  }

}
