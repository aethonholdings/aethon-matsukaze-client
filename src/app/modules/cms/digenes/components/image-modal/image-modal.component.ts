import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  @Input() url: string;

  constructor() { }

  ngOnInit(): void {
    document.body.style.overflowY = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflowY = 'scroll';
  }

}
