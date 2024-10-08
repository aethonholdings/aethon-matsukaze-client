import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'matsukaze-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  @Output() state = new EventEmitter<any>()
  email: string;

  constructor(
    private authService: UserService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.email) {
      this.authService.requestPasswordReset$(
        this.email,
        this.translateService.currentLang).subscribe(result => {
          this.state.emit({flow:"reset",state:"checkEmail"});
        });
    }
  }

  onChangeState(state: any) { this.state.emit(state); }

}
