import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { DealBodyComponent } from './Deals/deal-body/deal-body.component';
import { ForumComponent } from './Deals/forum/forum.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HomeComponent } from './home/home.component';
import { NewDealPostComponent } from './new-deal-post/new-deal-post.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'frontPage', component: FrontPageComponent },
      { path: 'forumPage', component: ForumComponent },
      { path: 'newPost', component: NewDealPostComponent },
      { path: 'dealContent/:dealId', component: DealBodyComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'userManagement', component: UserManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
