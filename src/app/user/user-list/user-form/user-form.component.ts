import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup; // Use the non-null assertion operator to tell TypeScript that it will be initialized in ngOnInit

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string, formData: any },
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: [this.data.formData ? this.data.formData.name : '', Validators.required],
      dateOfBirth: [this.data.formData ? this.data.formData.dateOfBirth : '', Validators.required],
      startWorkingDate: [this.data.formData ? this.data.formData.startWorkingDate : '', Validators.required],
      markType: [this.data.formData ? this.data.formData.markType : '', Validators.required],
      // Add other fields as needed
    });
  }

  saveUser() {
    const userData = this.userForm.value;

    if (this.data.mode === 'add') {
      this.userService.addUser(userData).subscribe(
        (response) => {
          this.dialogRef.close(true);
        },
        (error) => {
          // Handle error
        }
      );
    } else if (this.data.mode === 'edit') {
      this.userService.updateUser(userData).subscribe(
        (response) => {
          this.dialogRef.close(true);
        },
        (error) => {
          // Handle error
        }
      );
    }
  }
  closeDialog() {
    this.dialogRef.close(); // Close the dialog without passing any result
  }

}
