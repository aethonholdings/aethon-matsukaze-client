import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-pinup',
  templateUrl: './pinup.component.html',
  styleUrls: ['./pinup.component.scss']
})
export class PinupComponent implements OnInit {

  @Input() title: string;
  @Input() url: string;

  zoom: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  onClick() { this.zoom = !this.zoom; }

}
