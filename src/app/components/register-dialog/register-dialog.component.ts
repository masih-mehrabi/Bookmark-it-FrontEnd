import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import { UserRegisterService } from 'src/app/services/user-services/user-register.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  constructor(
    private userRegisterService: UserRegisterService,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private router: Router
    ) { }
  form: any;
  ngOnInit(): void {
    this.initForm();
  }

  initForm () {
    this.form = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }

  signup() {
    if(this.form.valid) {
      this.userRegisterService.signup(this.form.value).subscribe((result:any) =>{
        
        this.dialogRef.close(this.router.navigate(['bookmark']))
      })
    }
  }

}
