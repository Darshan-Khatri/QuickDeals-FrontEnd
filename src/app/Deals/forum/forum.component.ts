import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Deal } from 'src/app/models/deal';
import { DealParams } from 'src/app/models/dealParams';
import { Pagination } from 'src/app/models/pagination';
import { DealService } from 'src/app/Service/deal.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  deals: Deal[] = [];
  pagination: Pagination;
  dealsParams: DealParams;

  constructor(
    private dealService: DealService,
    private toastr: ToastrService,
    private router: Router) {
      this.dealsParams = dealService.getDealParams();
    }

  ngOnInit(): void {
    this.loadDeals();
  }

  loadDeals() {
    this.dealService.setDealParams(this.dealsParams);
    this.dealService.GetAllDeal(this.dealsParams).subscribe(dealsArray => {
      this.deals = dealsArray.result;
      this.pagination = dealsArray.pagination;
      console.log('DealBody',this.deals);
      console.log('ResponseHeader from server',this.pagination);
    }, err => console.log(err));
  }

  pageChanged(event: any){
    this.dealsParams.pageNumber = event.page;
    this.dealService.setDealParams(this.dealsParams);
    this.loadDeals();
  };

  resetFilter() {
    let dealsParams = new DealParams();
    this.dealsParams = dealsParams;
    this.loadDeals();
  }

  addLike(dealId: number) {
    // console.log(`event`, event);
    // event.stopPropagation();
    this.dealService.AddLike(dealId).subscribe((likesCount) => {
      console.log(`likes count = ${+likesCount}`);
      this.deals.find(x => x.id == dealId).likes = +likesCount;
    }, err => this.toastr.error(err.error));
  }

  addDislike(dealId: number) {
    // event.stopPropagation();
    this.dealService.AddDisLike(dealId).subscribe((DislikesCount) => {
      console.log(`Dislikes count = ${+DislikesCount}`);
      this.deals.find(x => x.id == dealId).disLikes = +DislikesCount;
    }, err => this.toastr.error(err.error));
  }

  // navigateToDealBody(dealId:number, event: Event) {
  //   this.router.navigateByUrl('dealContent/' + dealId);
  // }

}
