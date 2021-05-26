import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  team: string[] = ['konstantinos', 'kallia', 'avgi', 'dennis'];

  constructor() {

  }

  ngOnInit(): void {
  }

}
