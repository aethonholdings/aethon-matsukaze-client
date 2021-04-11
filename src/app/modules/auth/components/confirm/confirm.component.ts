import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'matsukaze-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  activationCode: string;
  email: string;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.activationCode = this.route.snapshot.queryParamMap.get("code");
    this.email = this.route.snapshot.queryParamMap.get("email");
    this.authService.confirm$({
      email: this.email,
      activationCode: this.activationCode
    }).pipe(
      map(user => {
        console.log(user);
      })
    ).subscribe();
  }

}
