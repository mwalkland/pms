import { Subject } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { StudentProjectsService } from 'app/student/student-projects/student-projects.service';
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
  browseBy: String = 'Staff';

  constructor(private projectService: StudentProjectsService, private authService: AuthService) { }

  ngOnInit() {
    this.browseBy = this.projectService.getBrowseBy();
    this.projectService.browseByChanged.subscribe(browseBy => {
      this.browseBy = browseBy;
    })
  }

  onChange() {
    this.projectService.changeBrowseBy(this.browseBy);
  }

}
