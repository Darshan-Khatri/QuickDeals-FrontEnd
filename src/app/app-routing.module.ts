import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealSelectionComponent } from './_admin/deal-selection/deal-selection.component';
import { UserManagementComponent } from './_admin/user-management/user-management.component';
import { DealBodyComponent } from './Deals/deal-body/deal-body.component';
import { ForumComponent } from './Deals/forum/forum.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HomeComponent } from './home/home.component';
import { NewDealPostComponent } from './new-deal-post/new-deal-post.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { ModeratorGuard } from './_guards/moderator.guard';


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
      { path: 'adminOrModerator', component: DealSelectionComponent, canActivate: [ModeratorGuard] },
      { path: 'userManagement', component: UserManagementComponent, canActivate: [AdminGuard] },
    ]
  },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
