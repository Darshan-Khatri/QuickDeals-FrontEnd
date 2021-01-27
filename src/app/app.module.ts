import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './Service/account.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { FrontPageComponent } from './front-page/front-page.component';
import { RegisterComponent } from './register/register.component';
import { ForumComponent } from './Deals/forum/forum.component';
import { DealCardComponent } from './Deals/deal-card/deal-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NewDealPostComponent } from './new-deal-post/new-deal-post.component';
import { DealBodyComponent } from './Deals/deal-body/deal-body.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FrontPageComponent,
    RegisterComponent,
    ForumComponent,
    DealCardComponent,
    NewDealPostComponent,
    DealBodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
