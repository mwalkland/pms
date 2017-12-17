import { StudentService } from '../student.service';
import { Subject } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-student-projects',
  templateUrl: './student-projects.component.html',
  styleUrls: ['./student-projects.component.css']
})
export class StudentProjectsComponent implements OnInit {
  values = [
    { value: 'Staff'},
    { value: 'Area'}
  ];
  browseBy = 'Staff';

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.browseBy = this.studentService.getBrowseBy();
    this.studentService.browseByChanged.subscribe(browseBy => {
      this.browseBy = browseBy;
    })
  }

  onChange() {
    this.studentService.changeBrowseBy(this.browseBy);
  }

}
