import { Subject } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { StudentProjectsService } from 'app/student/student-projects/student-projects.service';

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

  constructor(private projectService: StudentProjectsService) { }

  ngOnInit() {
    this.browseBy = this.projectService.getBrowseBy();
    console.log(this.browseBy)
    this.projectService.browseByChanged.subscribe(browseBy => {
      this.browseBy = browseBy;
    })
  }

  onChange() {
    this.projectService.changeBrowseBy(this.browseBy);
  }

}
