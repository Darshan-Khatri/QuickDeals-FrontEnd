import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../Service/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}
  currentUser: User;
  constructor(
    public accountService: AccountService,
    private router: Router,
    ) { }

  ngOnInit(): void {}


  login() {
    this.accountService.login(this.model).subscribe(response => {
      //this.accountService.currentUser$.subscribe(user => console.log(user));
      this.router.navigateByUrl('/frontPage');
    });
  }


  logout() {
    this.accountService.logout();
  }

}
