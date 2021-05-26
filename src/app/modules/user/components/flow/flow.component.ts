import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'matsukaze-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  flow: string;
  state: string;
  lang: string;

  private _states = {
    "00000000": {flow: "login", state: "form"},
    "00000100": {flow: "register", state: "form"},
    "00000110": {flow: "register", state: "checkEmail"},
    "00000111": {flow: "register", state: "confirm"},
    "00100000": {flow: "reset", state: "forgot"},
    "00110000": {flow: "reset", state: "checkEmail"},
    "00111000": {flow: "reset", state: "reset"}
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const state = this._states[params?.state];
      this.lang = params?.lang;
      if(state) {
        this.flow = state.flow;
        this.state = state.state;
      } else {
        this.setState({flow: 'login', state: 'form'});
      }
    });
  }

  onChangeState($event): void {
    this.setState($event);
  }

  setState(params: any): void {
    for(let stateId in this._states) {
      if(this._states[stateId].flow==params?.flow && this._states[stateId].state==params.state) {
        this.router.navigate(['auth'], {
          queryParams: {state: stateId, lang: this.lang}
        })
        break;
      }
    }
  }
}
