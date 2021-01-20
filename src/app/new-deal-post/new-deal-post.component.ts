import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewDeal } from '../models/new-deal';
import { DealService } from '../Service/deal.service';

@Component({
  selector: 'app-new-deal-post',
  templateUrl: './new-deal-post.component.html',
  styleUrls: ['./new-deal-post.component.css']
})
export class NewDealPostComponent implements OnInit {

  Deal: any = {} ;
  constructor(
    private dealService: DealService,
    private router: Router,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }
  PostDeal() {
    this.dealService.PostDeal(this.Deal).subscribe(() => {
      this.toastr.success('Deal posted successfully!!');
    },
      err => this.toastr.error(err.error),
      () => this.router.navigateByUrl('/forumPage')
    );
  }
}
