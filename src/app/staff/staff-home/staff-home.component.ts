import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.css']
})
export class StaffHomeComponent implements OnInit {
  name: string
  constructor() { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
  }

}
