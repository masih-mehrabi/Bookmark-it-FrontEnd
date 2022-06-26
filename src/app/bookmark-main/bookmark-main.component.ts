import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddBookmarkDialogComponent } from '../components/add-bookmark-dialog/add-bookmark-dialog.component';
import { Bookmark } from '../interfaces/bookmark.interface';
import { BookmarkService } from '../services/bookmark-services/bookmark.service';

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
    
    private dialogRef: MatDialogRef<AddBookmarkDialogComponent>,
    private router: Router
    ) {
     }


    openDialog () {
      this.dialog.open(AddBookmarkDialogComponent, {
        
      }).afterClosed().subscribe(val => {
        if(val == 'save') {
          this.getBookmarks();
        }
      })
    }
  ngOnInit(): void {
    this.getBookmarks();
    }

    getBookmarks() {
      this.bookmarkService.getBookmarks().subscribe(
        (result) => {
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
        }
        
      )
    }
    
    editBookmark(row: any) {
      this.dialog.open(AddBookmarkDialogComponent, {
        data:row
      }).afterClosed().subscribe(val=> {
        if(val == 'update') {
          this.getBookmarks();
        }
      })
    }
    deleteBookmark(id: number) {
      this.bookmarkService.deleteBookmark(id).subscribe({
        next: (res) => {
          this.getBookmarks();
        }
      })
        
      
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
 
    logout() {
      localStorage.removeItem('toekn')
      this.router.navigate(['']);
    }
  // getBookmarks() {
  //   this.bookmarkService.getBookmarks().subscribe((result) => {
  //     console.log(result)
  //   })
  // }
  

  
}
