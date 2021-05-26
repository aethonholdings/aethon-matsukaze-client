import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatsukazeObjectTypes } from 'src/app/model/model';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'matsukaze-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  @Output() state = new EventEmitter<any>();
  email: string;
  password: string;
  code: string;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParamMap.get("code");
    this.email = this.route.snapshot.queryParamMap.get("email");
  }

  onSubmit(): void {
    if(this.email && this.password && this.code) {
      this.spinner.show();
      this.userService.resetPassword$(this.email, this.password, this.code).subscribe(obj => {
        console.log(obj)
        if(obj?.matsukazeObjectType==MatsukazeObjectTypes.error) {
          this.error = obj.type;
        } else {
          this.state.emit({flow:'reset',state:'confirm'});
        }
        this.spinner.hide();
      });
    }
  }

}
