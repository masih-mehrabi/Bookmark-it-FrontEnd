import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookmarkService } from 'src/app/services/bookmark-services/bookmark.service';
import { NotifierService } from 'src/app/services/notification-services/notifier.service';

@Component({
  selector: 'app-add-bookmark-dialog',
  templateUrl: './add-bookmark-dialog.component.html',
  styleUrls: ['./add-bookmark-dialog.component.scss'],
})
export class AddBookmarkDialogComponent implements OnInit {
  form!: FormGroup;
  actionBtn: string = 'Add Bookmark';
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddBookmarkDialogComponent>,
    private bookmarkSerive: BookmarkService,
    private snackbar: NotifierService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(''),
      description: new FormControl(''),
      link: new FormControl(''),
    });

    if (this.editData) {
      this.actionBtn = 'Update Bookmark';
      this.form.controls['title'].setValue(this.editData.title);
      this.form.controls['description'].setValue(this.editData.description);
      this.form.controls['link'].setValue(this.editData.link);
    }
    console.log(this.editData);
  }

  call() {
    if (!this.editData) {
      this.addBookmark();
    } else {
      this.updateBookmark();
    }
  }
  addBookmark() {
    if (this.form.valid) {
      this.bookmarkSerive.addBookmark(this.form.value).subscribe((result) => {
        this.dialogRef.close('save');
        this.snackbar.showNotification(
          'Bookmark added successfully',
          'OK',
          'success'
        );
      });
    }
  }

  updateBookmark() {
    if (this.form.valid) {
      this.bookmarkSerive
        .updateBookmark(this.form.value, this.editData.id)
        .subscribe((result) => {
          this.snackbar.showNotification(
            'Bookmark updated successfully',
            'OK',
            'success'
          );
          this.form.reset();
          this.dialogRef.close('update');
        });
    }
  }
}
