import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../auth/user.model';
import { StudentService } from '../../student.service';
import { StaffMatcher } from '../staff-matcher';

@Component({
  selector: 'app-student-create-suggested-staff',
  templateUrl: './student-create-suggested-staff.component.html',
  styleUrls: ['./student-create-suggested-staff.component.css']
})
export class StudentCreateSuggestedStaffComponent implements OnInit {
  areas: string[] = this.data.areas;
  staff: User[] = this.data.staff;
  suggestedStaff: User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { areas: string[], staff: User[] },
    private studentService: StudentService
  ) { }

  ngOnInit() {
    const matcher = new StaffMatcher(this.areas, this.staff);
    const suggested: { email: string, score: number }[] = matcher.findStaff();
    console.log(suggested);
    console.log(this.staff);
    for (const s of suggested) {
      for (const staff of this.staff) {
        if (s.email === staff.email) {
          this.suggestedStaff.push(staff);
        }
      }
    }
  }

  selectStaffMember(staff: User) {
    this.studentService.selectStaffMember.next(staff);
  }

}
