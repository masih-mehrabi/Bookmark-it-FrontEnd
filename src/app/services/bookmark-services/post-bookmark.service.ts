import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBookmark } from 'src/app/interfaces/add-bookmark.interface';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostBookmarkService {

  constructor(
    private http: HttpClient
  ) { }

  addBookmark(data: AddBookmark) {
    return (
      this.http.post(`${baseUrl}bookmarks`, data)
      );
    
  }
}
