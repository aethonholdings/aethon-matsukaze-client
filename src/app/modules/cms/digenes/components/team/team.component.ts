import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matsukaze-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team: string[][] = [['konstantinos', 'kallia'], ['avgoustos', 'dennis']];

  ngOnInit(): void {
  }

}
