import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Bookmark } from 'src/app/interfaces/bookmark.interface';
import { EditUser } from 'src/app/interfaces/edit-user.interface';
import { UserRegister } from 'src/app/interfaces/user.-register.interface';
import { GetUserInfoService } from 'src/app/services/user-services/get-user-info.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  form!: FormGroup;
  user: any = {}
   
  
    
  
  date = new Date();
  constructor(
    private getUserInfoService: GetUserInfoService, 
    private datePipe: DatePipe,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUserInfo();
  }
  initForm() {
    this.form = new FormGroup({
      id: new FormControl(''),
      createdAt: new FormControl(''),
      updatedAt: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('')
    })
  }




getUserInfo () {
  
  this.getUserInfoService.getUserInfo().subscribe((result) => {
    console.log(result)
    this.user = result;
    this.form.patchValue({
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      createdAt: this.user.createdAt= this.datePipe.transform(this.date, 'EEEE, MMMM d, y, h:mm:ss a zzzz'),
      updatedAt: this.user.updatedAt = this.datePipe.transform(this.date, 'dd-MM-yyyy'),
      email: this.user.email
    })
  })
}
editInformation(){
  if (this.form.valid) {
    this.getUserInfoService.editUserInfo(this.form.value).subscribe((result) => {
      alert('information updated');
      this.getUserInfo();
    })
  }

}logout() {
  localStorage.removeItem('token');
  this.router.navigate(['']);
}
}
