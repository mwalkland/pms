import {
  Component, OnInit, Inject, ViewChild
} from '@angular/core';
import { StaffService } from '../../../staff.service';
import { MAT_DIALOG_DATA, MatAutocompleteTrigger } from '@angular/material';
import { Areas } from '../areas.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-staff-profile-details-edit',
  templateUrl: './staff-profile-details-edit.component.html',
  styleUrls: ['./staff-profile-details-edit.component.css']
})
export class StaffProfileDetailsEditComponent implements OnInit {
  areas: Areas;
  suggestedAreas: string[];
  areaCtrl1: FormControl;
  areaCtrl2: FormControl;
  areaCtrl3: FormControl;
  areaCtrl4: FormControl;
  areaCtrl5: FormControl;
  filteredAreas: Observable<string[]>;
  @ViewChild(MatAutocompleteTrigger) autoComplete: MatAutocompleteTrigger;

  constructor(private staffService: StaffService, @Inject(MAT_DIALOG_DATA) public data: { areas: Areas }) {
    this.areas = data.areas;
    this.areaCtrl1 = new FormControl(this.areas.first);
    this.areaCtrl2 = new FormControl();
    this.areaCtrl3 = new FormControl();
    this.areaCtrl4 = new FormControl();
    this.areaCtrl5 = new FormControl();
    this.staffService.getSuggestedAreas().subscribe((areas: string[]) => {
      this.suggestedAreas = areas;
    });
  }

  ngOnInit() {
  }

  save(first: string, second: string, third: string, fourth: string, fifth: string) {
    this.areas.first = first;
    this.areas.second = second;
    this.areas.third = third;
    this.areas.fourth = fourth;
    this.areas.fifth = fifth;
    this.staffService.updateStaffAreas(this.areas).subscribe();
  }

  filterAreas(name: string) {
    return this.suggestedAreas.filter(
      area => area.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  changeFocus(input: number) {
    switch (input) {
      case 1:
        this.filteredAreas = this.areaCtrl1.valueChanges.startWith('')
          .map(area => area ? this.filterAreas(area) : this.suggestedAreas.slice());
        break;
      case 2:
        this.filteredAreas = this.areaCtrl2.valueChanges.startWith('')
          .map(area => area ? this.filterAreas(area) : this.suggestedAreas.slice());
        break;
      case 3:
        this.filteredAreas = this.areaCtrl3.valueChanges.startWith('')
          .map(area => area ? this.filterAreas(area) : this.suggestedAreas.slice());
        break;
      case 4:
        this.filteredAreas = this.areaCtrl4.valueChanges.startWith('')
          .map(area => area ? this.filterAreas(area) : this.suggestedAreas.slice());
        break;
      case 5:
        this.filteredAreas = this.areaCtrl5.valueChanges.startWith('')
          .map(area => area ? this.filterAreas(area) : this.suggestedAreas.slice());
        break;
    }
  }

}
