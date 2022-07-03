import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../components/register-dialog/register-dialog.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  openLoginDialog(): void {
    const open = this.dialog.open(LoginDialogComponent, {});
  }

  openRegisterDialog(): void {
    const open = this.dialog.open(RegisterDialogComponent, {
      panelClass: 'dialog-box',
    });
  }

  ngOnInit(): void {}
}
