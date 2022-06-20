import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { AddBookmarkDialogComponent } from '../components/add-bookmark-dialog/add-bookmark-dialog.component';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { Bookmark } from '../interfaces/bookmark.interface';
import { BookmarkService } from '../services/bookmark-services/get-bookmark.service';
import { PostBookmarkService } from '../services/bookmark-services/post-bookmark.service';
import { UserLoginService } from '../services/user-services/user-login.service';

@Component({
  selector: 'app-bookmark-main' ,
  templateUrl: './bookmark-main.component.html',
  styleUrls: ['./bookmark-main.component.scss']
})
export class BookmarkMainComponent implements OnInit {
  displayedColumns: string[] = ['id','createdAt','updatedAt','title', 'description', 'link', 'action'];
  dataSource!: MatTableDataSource<Bookmark>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( 
    private bookmarkService: BookmarkService,
    public dialog: MatDialog,
    private addBookmarkService: PostBookmarkService,
    private dialogRef: MatDialogRef<AddBookmarkDialogComponent>,
    ) {
     }


    openDialog () {
      this.dialog.open(AddBookmarkDialogComponent, {
        
      })
    }
  ngOnInit(): void {
    this.getBookmarks();
    }

    getBookmarks() {
      this.bookmarkService.getBookmarks().subscribe(
        (result) => {this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
        }
        
      )
    }
    
    editBookmark(row: any) {
      this.dialog.open(AddBookmarkDialogComponent, {
        data:row
      })
    }
    deleteBookmark() {
  
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
 
  // getBookmarks() {
  //   this.bookmarkService.getBookmarks().subscribe((result) => {
  //     console.log(result)
  //   })
  // }
  

  
}
