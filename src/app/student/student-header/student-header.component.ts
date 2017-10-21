import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class StudentHeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  // onLogOut() {
  //   this.authService.notifyLogoutEvent();
  // }

}
