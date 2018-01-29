import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Project } from '../../core/project.model';

@Component({
  selector: 'app-student-my-project',
  templateUrl: './student-my-project.component.html',
  styleUrls: ['./student-my-project.component.css']
})
export class StudentMyProjectComponent implements OnInit {

  project: Project;
  loaded = false;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudentProject().subscribe((project: Project) => {
      this.project = project;
      this.loaded = true;
    })
  }

}
