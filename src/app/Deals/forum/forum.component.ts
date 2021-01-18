import { Component, OnInit } from '@angular/core';
import { Deal } from 'src/app/models/deal';
import { DealService } from 'src/app/Service/deal.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  deals: Deal[] = [];
  constructor(private dealService: DealService) { }

  ngOnInit(): void {
    this.dealService.GetAllDeal().subscribe(dealsArray => {
      this.deals = dealsArray;
      console.log(this.deals);
    }, err => console.log(err));
  }

}
