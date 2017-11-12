import { User } from './../../../auth/user.model';
import { StudentProjectsService } from './../student-projects.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student-projects-list',
  templateUrl: './student-projects-list.component.html',
  styleUrls: ['./student-projects-list.component.css']
})
export class StudentProjectsListComponent implements OnInit {

  @Input() browse: String;
  staffList: User[];

  constructor(private studentService: StudentProjectsService) { }

  ngOnInit() {
    this.studentService.getStaff()
      .subscribe((staff: User[]) => {
        this.staffList = staff;
        console.log(this.staffList);
      });
  }

  getStaff() {
    this.studentService.getStaff()
      .subscribe((staff: User[]) => {
        this.staffList = staff;
      });

  }

}
