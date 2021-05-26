import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatsukazeObjectTypes } from 'src/app/model/model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'matsukaze-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @Output() state = new EventEmitter<string>()
  activationCode: string;
  email: string;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private authService: UserService
  ) {}

  ngOnInit(): void {
    this.activationCode = this.route.snapshot.queryParamMap.get("code");
    this.email = this.route.snapshot.queryParamMap.get("email");
    this.authService.confirm$({
      email: this.email,
      activationCode: this.activationCode
    }).subscribe(obj => {
      if(obj.matsukazeObjectType===MatsukazeObjectTypes.error) this.error = obj.type;
    });
  }

  onChangeState(state: any) { this.state.emit(state); }
}
