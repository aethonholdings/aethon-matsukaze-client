import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  @Input() img: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() arrow: boolean;
  @Input() gradient: boolean;
  gradientClass: string;

  constructor() { }

  ngOnInit(): void {
    if(this.gradient) this.gradientClass="gradient";
  }

}
