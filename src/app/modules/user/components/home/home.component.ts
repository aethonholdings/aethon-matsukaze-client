import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'matsukaze-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: UserService
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout$().subscribe();
  }

}
