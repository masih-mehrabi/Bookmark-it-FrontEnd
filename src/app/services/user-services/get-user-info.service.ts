import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from 'src/app/interfaces/user.-register.interface';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetUserInfoService {
  constructor(private http: HttpClient) {}

  getUserInfo() {
    return this.http.get<any>(`${baseUrl}users/me`);
  }
  editUserInfo(data: any) {
    return this.http.patch<any>(`${baseUrl}users`, data);
  }
}
