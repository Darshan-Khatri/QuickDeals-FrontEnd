import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Deal } from 'src/app/models/deal';
import { DealService } from 'src/app/Service/deal.service';

@Component({
  selector: 'app-deal-card',
  templateUrl: './deal-card.component.html',
  styleUrls: ['./deal-card.component.css']
})
export class DealCardComponent implements OnInit {

  @Input() deal : Deal;
  @Output() likeDeal = new EventEmitter<any>();
  @Output() dislikeDeal = new EventEmitter<any>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  addLike(dealId: number, event: Event) {
    event.stopPropagation();
    this.likeDeal.emit(dealId);
  }

  addDislike(dealId: number,  event: Event) {
    event.stopPropagation();
    this.dislikeDeal.emit(dealId);
  }

  navigateToDealBody(dealId:number) {
    this.router.navigateByUrl('dealContent/' + dealId);
  }
}
