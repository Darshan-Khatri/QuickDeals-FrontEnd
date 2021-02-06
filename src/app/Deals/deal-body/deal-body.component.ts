import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Deal, Comment } from 'src/app/models/deal';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/Service/account.service';
import { DealService } from 'src/app/Service/deal.service';

@Component({
  selector: 'app-deal-body',
  templateUrl: './deal-body.component.html',
  styleUrls: ['./deal-body.component.css']
})
export class DealBodyComponent implements OnInit {

  dealId: number = 0;
  deal: Deal = null;
  isCollapsed = true;
  commentObject: any = {};
  currentUser: User = null;
  userComment: string;

  constructor(
    private dealService: DealService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.dealId = +this.activatedRoute.snapshot.paramMap.get('dealId');
    this.loadDeal();
    this.accountService.currentUser$.subscribe(x => {
      this.currentUser = x;
    }, err => this.toastr.error(err.error))
  }

  loadDeal() {
    this.dealService.GetDeal(this.dealId).subscribe((response) => {
      this.deal = response;
    }, err => console.log(err.error))
  }

  addLike(dealId: number) {
    this.dealService.AddLike(dealId).subscribe(likeCount => {
      console.log('likeCount', likeCount);
      console.log('likeCount type of', typeof likeCount.value);
      if (typeof likeCount.value === 'string') this.toastr.error(likeCount.value);
      else this.deal.likes = likeCount.value;
    }, err => this.toastr.error(err.error));
  }

  addDislike(dealId: number) {
    this.dealService.AddDisLike(dealId).subscribe(dislikeCount => {
      console.log('dislikeCount', dislikeCount);
      console.log('dislikeCount type of', typeof dislikeCount.value);
      if (typeof dislikeCount.value === 'string') this.toastr.error(dislikeCount.value);
      else this.deal.disLikes = dislikeCount.value;
    }, err => this.toastr.error(err.error));
  }

  addComment() {
    this.commentObject.comment = this.userComment;
    this.commentObject.dealId = this.dealId;
    this.commentObject.username = this.currentUser.username;

    this.dealService.AddComment(this.commentObject).subscribe(feedBack => {
      console.log('New comment' , feedBack);
      this.deal.comments.push(feedBack);
      this.toastr.success('Thank you for your feedback on this deal');
    }, err => this.toastr.error(err.error),
    () => this.isCollapsed = !this.isCollapsed)
  }
}
