import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import { Bookmark } from 'src/app/interfaces/bookmark.interface';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(
    private http: HttpClient
  ) { }

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${baseUrl}bookmarks`);
    
  }
  
}
