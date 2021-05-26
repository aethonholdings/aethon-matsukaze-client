import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user/user.service';

@Component({
  selector: 'matsukaze-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  constructor(private authService: UserService) { }

  ngOnInit(): void {
  }

}
