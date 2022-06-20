import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import { UserLogin } from 'src/app/interfaces/user.login.interface';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  
  

  constructor(private http: HttpClient) { }

 



  



  signin(data: UserLogin):Observable<any> {
    return this.http.post(`${baseUrl}auth/signin`, data)
  }
  
  
}
