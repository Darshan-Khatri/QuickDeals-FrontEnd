import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealBodyComponent } from './Deals/deal-body/deal-body.component';
import { ForumComponent } from './Deals/forum/forum.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HomeComponent } from './home/home.component';
import { NewDealPostComponent } from './new-deal-post/new-deal-post.component';
import { RegisterComponent } from './register/register.component';
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
    ]
  },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
