import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'matsukaze-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  email: string;
  password: string;
  retry: boolean = false;

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    private router: Router) {
  }

  ngOnInit() { }

  submit() {
    this.apiService.login$(this.email, this.password).subscribe(response => {
      if(response) {
        this.retry = false;
        this.router.navigateByUrl(this.apiService.getRedirectUrl());
      }
      else {
        this.retry = true;
      }
    })
  }

}
