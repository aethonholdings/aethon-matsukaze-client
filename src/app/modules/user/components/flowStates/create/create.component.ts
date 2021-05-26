import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MatsukazeObjectTypes } from 'src/app/model/model';
import { UserService } from '../../../services/user/user.service';
import { ValidateService } from '../../../services/validate/validate.service';

@Component({
  selector: 'matsukaze-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @Output() state = new EventEmitter<any>()
  email: string;
  password: string;
  verifyPassword: string;
  error: string = null;

  constructor(
    private validateService: ValidateService,
    private authService: UserService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  onCreate() {
    const params: any = {
      email: this.email,
      password: this.password,
      verifyPassword: this.verifyPassword,
      lang: this.translateService.currentLang
    }
    this.error = this.validateService.validateParams(params)
    console.log(params);
    console.log(this.error);
    // if(!this.error) {
    //   this.spinner.show();
    //   this.authService.register$(params).subscribe(obj => {
    //     if(obj.matsukazeObjectType==MatsukazeObjectTypes.error) {
    //       this.error = obj.type;
    //     } else {
    //       this.state.emit({flow:'register',state:'checkEmail'});
    //     }
    //     this.spinner.hide();
    //   })
    // }
  }

  onChangeState(state: any) { this.state.emit(state); }

}
