import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    CarouselModule.forRoot(),

  ],

  exports: [
    BsDropdownModule,
    ToastrModule,
    CarouselModule,
  ]
})
export class SharedModule { }
