import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StudentProjectsService } from 'app/student/student-projects/student-projects.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  name: string;

  constructor(private projectService: StudentProjectsService, private router: Router) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
  }

  goToProjects(browseBy: String) {
    this.projectService.changeBrowseBy(browseBy);
    this.router.navigate(['/projects']);
  }

}
