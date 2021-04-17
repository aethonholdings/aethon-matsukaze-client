import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MatsukazeObjectTypes } from 'src/app/model/model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'matsukaze-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  activationCode: string;
  email: string;
  error: string;

  constructor(private route: ActivatedRoute, private authService: UserService) {}

  ngOnInit(): void {
    this.activationCode = this.route.snapshot.queryParamMap.get("code");
    this.email = this.route.snapshot.queryParamMap.get("email");
    this.authService.confirm$({
      email: this.email,
      activationCode: this.activationCode
    }).pipe(
      mergeMap(obj => {
        if(obj.matsukazeObjectType==MatsukazeObjectTypes.user) {
          return this.authService.loginFromConfirm$(obj);
        } else {
          this.error = obj.type;
          return of(null);
        }
      })
    ).subscribe();
  }

}
