import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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
  url: Observable<string>;
  gradientClass: string;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.url = this.translateService.get(this.img);
    if(this.gradient) this.gradientClass="gradient";
  }



}
