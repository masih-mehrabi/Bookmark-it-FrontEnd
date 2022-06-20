import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkMainComponent } from './bookmark-main/bookmark-main.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AuthGuard } from './guard/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
{
  path: '',
  component: HomepageComponent
},
{
  path: 'bookmark',
  component: BookmarkMainComponent,canActivate:[AuthGuard] 
},
{
  path: 'useredit',
  component: EditUserComponent, canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
