import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatDialogRef } from '@angular/material';
import { AdminListComponent } from '../admin-list/admin-list.component';

@Component({
  selector: 'app-admin-areas',
  templateUrl: './admin-areas.component.html',
  styleUrls: ['./admin-areas.component.css']
})
export class AdminAreasComponent implements OnInit {

  areas: string[]
  editMode = false;
  @ViewChild('areaInput') newArea: ElementRef;
  error = false;

  constructor(private adminService: AdminService, private dialogRef: MatDialogRef<AdminListComponent>) { }

  ngOnInit() {
    this.adminService.getSuggestedAreas().subscribe((areas: string[]) => {
      this.areas = areas;
    })
  }

  addArea() {
    this.areas.push(this.newArea.nativeElement.value);
    this.newArea.nativeElement.value = '';
  }

  onEdit() {
    this.editMode = true;
  }

  onDelete(index: number) {
    this.areas.splice(index, 1);
  }

  onSave() {
    this.adminService.updateSuggestedAreas(this.areas).subscribe(() => {
      this.dialogRef.close();
    }, error => this.error = true);
  }

}
