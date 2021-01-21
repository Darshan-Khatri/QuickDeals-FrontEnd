import { Component, OnInit } from '@angular/core';
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
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.loadDeals();
  }

  loadDeals() {
    this.dealService.GetAllDeal().subscribe(dealsArray => {
      this.deals = dealsArray;
      console.log(this.deals);
    }, err => console.log(err));
  }

  addLike(dealId: number) {
    this.dealService.AddLike(dealId).subscribe((likesCount) => {
      console.log(`likes count = ${+likesCount}`);
      this.deals.find(x => x.id == dealId).likes = +likesCount;
    }, err => this.toastr.error(err.error));
  }

  addDislike(dealId: number) {
    this.dealService.AddDisLike(dealId).subscribe((DislikesCount) => {
      console.log(`Dislikes count = ${+DislikesCount}`);
      this.deals.find(x => x.id == dealId).disLikes = +DislikesCount;
    }, err => this.toastr.error(err.error));
  }
}
