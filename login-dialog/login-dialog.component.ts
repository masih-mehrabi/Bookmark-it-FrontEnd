import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notification-services/notifier.service';
import { UserLoginService } from 'src/app/services/user-services/user-login.service';
@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  form: any;

  constructor(
    private userLoginService: UserLoginService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private snackbar: NotifierService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  signin() {
    if (this.form.valid) {
      this.userLoginService.signin(this.form.value).subscribe({
        next: (result: any) => {
          localStorage.setItem('token', result.access_token);
          this.dialogRef.close(this.router.navigate(['bookmark']));
          this.snackbar.showNotification('Your are logged in', 'OK', 'success');
        },
        error: (err) => {
          this.snackbar.showNotification(err.message, 'OK', 'error');
        },
      });
    }
  }
}
