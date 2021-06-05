import { Component, Input, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'matsukaze-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  @Input() img: string;
  @Input() title: string;
  @Input() subtitle: string;
  faChevronDown = faChevronDown;

  constructor() { }

  ngOnInit(): void {
  }

}
