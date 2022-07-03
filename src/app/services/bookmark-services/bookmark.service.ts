import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBookmark } from 'src/app/interfaces/add-bookmark.interface';
import { Bookmark } from 'src/app/interfaces/bookmark.interface';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${baseUrl}bookmarks`);
  }

  addBookmark(data: AddBookmark) {
    return this.http.post<any>(`${baseUrl}bookmarks`, data);
  }

  updateBookmark(data: any, id: string) {
    return this.http.patch<any>(`${baseUrl}bookmarks/` + id, data);
  }

  deleteBookmark(id: number) {
    return this.http.delete<any>(`${baseUrl}bookmarks/` + id);
  }
}
