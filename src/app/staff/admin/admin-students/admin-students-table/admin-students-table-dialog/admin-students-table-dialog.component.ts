import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Student } from '../../../student.model';

@Component({
  selector: 'app-admin-students-table-dialog',
  templateUrl: './admin-students-table-dialog.component.html',
  styleUrls: ['./admin-students-table-dialog.component.css']
})
export class AdminStudentsTableDialogComponent implements OnInit {

  student: Student;

  constructor( @Inject(MAT_DIALOG_DATA) public data: { student: Student }) {
    this.student = data.student;
  }

  ngOnInit() {
  }

}
