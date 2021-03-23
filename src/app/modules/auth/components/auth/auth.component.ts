import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'matsukaze-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email: string;
  password: string;
  retry: boolean = false;

  constructor(private apiService: ApiService) { }

  submit() {
    // this.apiService.login$(this.email, this.password).pipe(
    //   map(response => { if(response) this.retry = false; else this.retry = true; })
    // ).subscribe();
  }

}
