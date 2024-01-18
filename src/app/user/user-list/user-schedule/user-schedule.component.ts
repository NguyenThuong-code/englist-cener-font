import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-schedule',
  templateUrl: './user-schedule.component.html',
  styleUrls: ['./user-schedule.component.css']
})
export class UserScheduleComponent implements OnInit {


  shifts = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday(1)', 'Saturday(2)', 'Saturday(3)', 'Sunday(1)', 'Sunday(2)', 'Sunday(3)', 'Sunday(4)'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserScheduleComponent>
  ) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
