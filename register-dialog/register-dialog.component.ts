import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notification-services/notifier.service';
import { UserRegisterService } from 'src/app/services/user-services/user-register.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  constructor(
    private userRegisterService: UserRegisterService,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private router: Router,
    private snackbar: NotifierService
  ) {}
  form: any;
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  signup() {
    if (this.form.valid) {
      this.userRegisterService.signup(this.form.value).subscribe({
        next: (result: any) => {
          localStorage.setItem('token', result.access_token);
          this.dialogRef.close(this.router.navigate(['bookmark']));
          this.snackbar.showNotification('Your are logged in, Welcome!!1', 'OK', 'success');
        },
        error: (err) => {
          this.snackbar.showNotification(
            'The Provided email is not in correct format or,there is already an account registered with the provided email address!!! ',
            'OK',
            'error'
          );
        },
      });
    }
  }
}
