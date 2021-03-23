import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  team: string[] = ['konstantinos', 'kallia', 'avgi', 'dennis'];

  constructor() {

  }

  ngOnInit(): void {
  }

}
