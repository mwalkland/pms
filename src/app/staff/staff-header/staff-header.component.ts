import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-staff-header',
  templateUrl: './staff-header.component.html',
  styleUrls: ['./staff-header.component.css']
})
export class StaffHeaderComponent implements OnInit {

  @ViewChild('navlist') navlist: ElementRef;
  isLeader: boolean;

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.isLeader = this.staffService.isModuleLeader();
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

}
