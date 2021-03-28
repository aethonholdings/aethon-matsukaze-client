import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'matsukaze-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  email: string;
  password: string;
  verifyPassword: string;
  error: boolean = false;
  @Output() state = new EventEmitter<string>()

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreate() {}

  onChangeState(state: string) { this.state.emit(state); }

}
