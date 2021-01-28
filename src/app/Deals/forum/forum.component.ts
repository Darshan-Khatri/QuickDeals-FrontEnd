import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Deal } from 'src/app/models/deal';
import { DealService } from 'src/app/Service/deal.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  deals: Deal[] = [];
  constructor(
    private dealService: DealService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadDeals();
  }

  loadDeals() {
    this.dealService.GetAllDeal().subscribe(dealsArray => {
      this.deals = dealsArray;
      console.log(this.deals);
    }, err => console.log(err));
  }

  addLike(dealId: number, event: Event) {
    console.log(`event`, event);
    event.stopPropagation();
    this.dealService.AddLike(dealId).subscribe((likesCount) => {
      console.log(`likes count = ${+likesCount}`);
      this.deals.find(x => x.id == dealId).likes = +likesCount;
    }, err => this.toastr.error(err.error));
  }

  addDislike(dealId: number,  event: Event) {
    event.stopPropagation();
    this.dealService.AddDisLike(dealId).subscribe((DislikesCount) => {
      console.log(`Dislikes count = ${+DislikesCount}`);
      this.deals.find(x => x.id == dealId).disLikes = +DislikesCount;
    }, err => this.toastr.error(err.error));
  }

  navigateToDealBody(dealId:number, event: Event) {
    this.router.navigateByUrl('dealContent/' + dealId);
  }
}
