import { StudentService } from '../../student.service';
import { User } from './../../../auth/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student-projects-list',
  templateUrl: './student-projects-list.component.html',
  styleUrls: ['./student-projects-list.component.css']
})
export class StudentProjectsListComponent implements OnInit {

  @Input() browse: String;
  staffList: User[];
  browseBy: String;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStaff()
      .subscribe((staff: User[]) => {
        this.staffList = staff;
        console.log(this.staffList);
      });
    this.browseBy = this.studentService.getBrowseBy();
    this.studentService.browseByChanged.subscribe(browse => {
      this.browseBy = browse;
    });
  }

  getStaff() {
    this.studentService.getStaff()
      .subscribe((staff: User[]) => {
        this.staffList = staff;
      });
  }

}
