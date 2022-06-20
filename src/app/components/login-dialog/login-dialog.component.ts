import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import { UserLoginService } from 'src/app/services/user-services/user-login.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  form: any; 

  constructor(
    private userLoginService: UserLoginService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginDialogComponent>
    
    
    
  ) { }

  ngOnInit(): void {
    this.initForm();
    }
  
  initForm (){
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      
    })
    
  }
  signin() {
    
    if(this.form.valid) {
      this.userLoginService.signin(this.form.value).subscribe((result:any) => {
        localStorage.setItem('token', result.access_token );
        this.dialogRef.close(this.router.navigate(['bookmark']))
      })

    }
  }

    


}
