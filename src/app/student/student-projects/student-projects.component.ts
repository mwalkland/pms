import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-projects',
  templateUrl: './student-projects.component.html',
  styleUrls: ['./student-projects.component.css']
})
export class StudentProjectsComponent implements OnInit {
  values = [
    { value: 'Staff', viewValue: 'Staff' },
    { value: 'Area', viewValue: 'Area'}
  ];
  browseBy: String = null;

  constructor() { }

  ngOnInit() {
  }

  onChange() {

  }

}
