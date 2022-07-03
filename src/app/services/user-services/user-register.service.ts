import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from 'src/app/interfaces/user.-register.interface';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  constructor(private http: HttpClient) {}
  signup(data: UserRegister) {
    return this.http.post(`${baseUrl}auth/signup`, data);
  }
}
