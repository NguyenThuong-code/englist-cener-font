import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {MatDialog} from "@angular/material/dialog";
import {PageEvent} from "@angular/material/paginator";
import {UserScheduleComponent} from "./user-schedule/user-schedule.component";
import {UserFormComponent} from "./user-form/user-form.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  data: User[]=[];
  form:FormGroup= new FormGroup({});
  isAllChecked=false;
  numberOfCheck=0;
  totalItems=0;
  text='Items has been saved';
  isMultiSelected=true;
  isClickCheckBox:boolean=false;
  // markType: { [key: number]: MarkType } = {
  //   1: MarkType.SIX_POINT_FIVE,
  //   2: MarkType.SEVEN,
  //   3: MarkType.SEVEN_POINT_FIVE
  // };
  dataSource= new MatTableDataSource<User>(this.data);
  displayUsers:string[]=[
    'name',
    'dateOfBirth',
    'startWorkingDate',
    'markType',
    'schedule',
    'action'
  ]
  filter = {
    page: 0,
    size: 10,
    name: '',
  }
  constructor(
    private formBuilder:FormBuilder,
    private route:Router,
    private user:UserService,
    private _dialog: MatDialog,

    // private notify: NotificationService
  ) {
  }
  ngOnInit() {
    const nameParam = this.route.parseUrl(this.route.url).queryParams['name'];
    if (nameParam) {
      this.filter.name = nameParam;
    }

    this.form = this.formBuilder.group({
      nameFilter: [this.filter.name, Validators.required], // Add validators if needed
    });

    this.getUserWithFilter(this.filter);
  }
  getUserWithFilter(page: any){
    this.user.getAllUserForPageByFilter(page).subscribe(res =>{
      this.data = res.users;
      this.totalItems=res.totalItems;
      this.dataSource= new MatTableDataSource<User>(this.data);
    }, error=>{
      this.text='Could not load data user';
      alert(this.text);
    })
  }

  openSchedulePopup(schedule: any): void {
    // Open the popup and pass the schedule data
    const dialogRef = this._dialog.open(UserScheduleComponent, {
      width: '900px',
      height:'250px',
      data: schedule
    });
  }
  addAndEditUser() {
    const dialogRef = this._dialog.open(UserFormComponent, {
      width: '700px',
      height:'600px',
      data: { mode: 'add', formData: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUserWithFilter(this.filter);
      }
    });
  }

  openEditUserPopup(user: User): void {
    const dialogRef = this._dialog.open(UserFormComponent, {
      width: '700px',
      height:'600px',
      data: { mode: 'edit', formData: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUserWithFilter(this.filter);
      }
    });
  }
  onkeydownEvent(event: any) {
    if(event.key==='Enter'){
      this.search();
    }
  }

  search() {
    this.filter.page= 0;
    this.filter.name= this.form.value.nameFilter;
    this.route.navigate(['/user/display'],{
      queryParams:{
        name:this.filter.name,

      }
    })
    this.getUserWithFilter(this.filter);
  }
  nextPage(event: PageEvent) {
    this.filter.page=event.pageIndex;
    this.filter.size=event.pageSize;
    this.getUserWithFilter(this.filter);
  }
}
