import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  name: string;

  constructor(
    private projectService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
  }

  goToProjects(browseBy: String) {
    this.projectService.changeBrowseBy(browseBy);
    this.router.navigate(['projects'], { relativeTo: this.route });
  }

}
