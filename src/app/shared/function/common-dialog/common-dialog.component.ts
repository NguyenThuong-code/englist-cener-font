import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-common-dialog',
  template:
  `<h2 mat-dialog-title>Delete Item</h2>
  <mat-dialog-content>
    <p>Are u sure want to delete book items?</p>
    <ul>
      <li *ngFor="let i of selectedIds">{{i}}</li>
    </ul>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button color="warn" [mat-dialog-close]="false">Cancel</button>
    <button mat-button color="primary" [mat-dialog-close]="true">Delete</button>
  </mat-dialog-actions>
  `
})
export class CommonDialogComponent  {
selectedIds:any=[];

  constructor(@Inject(MAT_DIALOG_DATA) public name:[]) { this.selectedIds=name}


}
