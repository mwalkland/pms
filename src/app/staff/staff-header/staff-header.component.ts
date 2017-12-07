import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-staff-header',
  templateUrl: './staff-header.component.html',
  styleUrls: ['./staff-header.component.css']
})
export class StaffHeaderComponent implements OnInit {

  @ViewChild('navlist') navlist: ElementRef;

  constructor() { }

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

}
