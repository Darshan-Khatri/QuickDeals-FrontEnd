import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Deal } from '../models/deal';
import { AdminService } from '../Service/admin.service';
import { DealService } from '../Service/deal.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private dealService: DealService,
    private toastr: ToastrService,
    private adminService: AdminService,
    ) { }

  deals: Deal[] = [];
  ngOnInit(): void {
    this.GetQualifiedDeals();
  }

  GetQualifiedDeals() {
    this.adminService.GetQualifiedDeals().subscribe(deals => {
      this.deals = deals;
    })
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
