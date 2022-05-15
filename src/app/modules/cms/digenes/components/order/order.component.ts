import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() text: string;
  @Input() link: string;

  constructor() { }

  ngOnInit(): void {
  }

}
