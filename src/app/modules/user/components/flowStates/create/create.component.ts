import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MatsukazeObjectTypes } from 'src/app/model/model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'matsukaze-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @Output() state = new EventEmitter<any>()
  email: string;
  password: string;
  error: string = null;

  constructor(
    private authService: UserService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  onCreate() {
    if(this.email && this.password) {
      const params: any = {
        email: this.email,
        password: this.password,
        lang: this.translateService.currentLang
      }
      this.spinner.show();
      this.authService.register$(params).subscribe(obj => {
        if(obj.matsukazeObjectType==MatsukazeObjectTypes.error) {
          this.error = obj.type;
        } else {
          this.state.emit({flow:'register',state:'checkEmail'});
        }
        this.spinner.hide();
      })
    }
  }

  validate(): string {
    return null;
  }

  onChangeState(state: any) { this.state.emit(state); }

}
