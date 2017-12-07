import { Router } from '@angular/router';
import { StudentProjectsService } from './student-projects/student-projects.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
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
