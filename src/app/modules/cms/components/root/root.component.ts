import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'matsukaze-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  team: string[] = ['konstantinos', 'kallia', 'avgi', 'dennis'];

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Digenes");
  }

}
