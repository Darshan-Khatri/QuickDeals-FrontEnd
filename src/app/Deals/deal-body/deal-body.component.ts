import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Deal } from 'src/app/models/deal';
import { DealService } from 'src/app/Service/deal.service';

@Component({
  selector: 'app-deal-body',
  templateUrl: './deal-body.component.html',
  styleUrls: ['./deal-body.component.css']
})
export class DealBodyComponent implements OnInit {

  dealId: number = 0;
  deal: Deal = null;
  constructor(
    private dealService: DealService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dealId = +this.activatedRoute.snapshot.paramMap.get('dealId');
    this.loadDeal();
  }

  loadDeal() {
    this.dealService.GetDeal(this.dealId).subscribe((response) => {
      this.deal = response;
    }, err => console.log(err.error))
  }

  addLike(dealId: number) {
    this.dealService.AddLike(dealId).subscribe(likeCount => {
      console.log('likeCount', likeCount);
      console.log('likeCount type of',typeof likeCount.value);
      if(typeof likeCount.value === 'string') this.toastr.error(likeCount.value);
      else this.deal.likes = likeCount.value;
    }, err => this.toastr.error(err.error));
  }

  // addDislike(dealId: number) {
  //   this.dislikeDeal.emit(dealId);
  // }
}
