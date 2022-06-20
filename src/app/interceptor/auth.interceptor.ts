import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { UserLoginService } from '../services/user-services/user-login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  


  constructor(
    private http: HttpClient,
    private router: Router
   
    
    
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return next.handle(req)
    .pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && localStorage.getItem('token') !== null ) {
       localStorage.removeItem('token')
       this.router.navigate([''])
      }
      return throwError(() => err)
    }));
  }
}
