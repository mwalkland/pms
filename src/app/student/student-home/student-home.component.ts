import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  name: string;

  constructor() { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
  }

}
