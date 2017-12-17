import { StudentService } from '../../student.service';
import { User } from './../../../auth/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student-projects-list',
  templateUrl: './student-projects-list.component.html',
  styleUrls: ['./student-projects-list.component.css']
})
export class StudentProjectsListComponent implements OnInit {

  @Input() browse: string;
  staffList: User[];
  areaList: string[];
  browseBy: string;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.browseBy = this.studentService.getBrowseBy();
    this.getItems();
    this.studentService.browseByChanged.subscribe(browse => {
      this.browseBy = browse;
      this.getItems();
    });
  }

  getItems() {
    if (this.browseBy === 'Staff' && this.staffList == null) {
      this.getStaff();
    }
    if (this.browseBy === 'Area' && this.areaList == null) {
      this.getAreas();
    }
  }

  getStaff() {
    this.studentService.getStaff()
      .subscribe((staff: User[]) => {
        this.staffList = staff;
      });
  }

  getAreas() {
    this.studentService.getAreas().subscribe((areas) => {
      this.areaList = areas
    });
  }

}
