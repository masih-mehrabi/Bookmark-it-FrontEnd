import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notification-services/notifier.service';
import { GetUserInfoService } from 'src/app/services/user-services/get-user-info.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  form!: FormGroup;
  user: any = {};
  

  
  constructor(
    private getUserInfoService: GetUserInfoService,
    private datePipe: DatePipe,
    private router: Router,
    private snackbar: NotifierService
  ) {}

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
      email: new FormControl(''),
    });
  }

  getUserInfo() {
    this.getUserInfoService.getUserInfo().subscribe((result) => {
      console.log(result);
      this.user = result;
      this.form.patchValue({
        createdAt: this.datePipe.transform(new Date(this.user.createdAt)),
        updatedAt: this.datePipe.transform(new Date(this.user.updatedAt)),
      });
    });
  }
  editInformation() {
    if (this.form.valid) {
      this.getUserInfoService
        .editUserInfo(this.form.value)
        .subscribe((result) => {
          this.snackbar.showNotification('Information Updated', 'Close', 'success')
          this.getUserInfo();
        });
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
