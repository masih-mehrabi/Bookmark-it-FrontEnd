import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostBookmarkService } from 'src/app/services/bookmark-services/post-bookmark.service';

@Component({
  selector: 'app-add-bookmark-dialog',
  templateUrl: './add-bookmark-dialog.component.html',
  styleUrls: ['./add-bookmark-dialog.component.scss']
})
export class AddBookmarkDialogComponent implements OnInit {
  form!: FormGroup;
  actionBtn: string = 'Add Bookmark';
  constructor(
    private formBuilder: FormBuilder,
    private addBookmarkService: PostBookmarkService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddBookmarkDialogComponent>,
    

  ) {}
   

  ngOnInit(): void {
    
      this.form = this.formBuilder.group({
        title: new FormControl(""),
        description: new FormControl(""),
        link: new FormControl("")
      });       

    if(this.editData) {
      this.actionBtn = 'Update Bookmark';
      this.form.controls['title'].setValue(this.editData.title);
      this.form.controls['description'].setValue(this.editData.description);
      this.form.controls['link'].setValue(this.editData.link);
    }
  }

  
    
  
  addBookmark() {
    if(!this.editData)
    {
      if(this.form.valid) {
        this.addBookmarkService.addBookmark(this.form.value).subscribe((result) => {
        })
        this.dialogRef.close('saved');
      }
    }
   
  }
}
