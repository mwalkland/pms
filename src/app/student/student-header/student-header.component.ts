import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StudentHeaderComponent implements OnInit {

  @ViewChild('navlist') navlist: ElementRef;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  show() {
    if (this.navlist.nativeElement.style.display === 'none') {
      this.showList();
    } else {
      this.hideList();
    }
  }

  showList() {
    this.navlist.nativeElement.style.display = 'block';
  }

  hideList() {
    this.navlist.nativeElement.style.display = 'none';
  }

  // onLogOut() {
  //   this.authService.notifyLogoutEvent();
  // }

}
