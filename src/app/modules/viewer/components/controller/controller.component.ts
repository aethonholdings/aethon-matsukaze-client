import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  swipe($event) {}

  previous() {}

  menu() {}

  next() {}

}
