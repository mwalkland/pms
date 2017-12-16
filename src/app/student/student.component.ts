import { StudentService } from './student.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  name: string;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
  }

  goToProjects(browseBy: String) {
    this.studentService.changeBrowseBy(browseBy);
    this.router.navigate(['/projects']);
  }

}
