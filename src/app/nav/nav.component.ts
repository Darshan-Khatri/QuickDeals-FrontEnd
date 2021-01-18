import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {}


  login() {
    this.accountService.login(this.model).subscribe(response => {
      //this.accountService.currentUser$.subscribe(user => console.log(user));
      this.toastr.success('Success');
      this.router.navigateByUrl('/frontPage');
    },
    (err) => {
      console.log(err.error);
      this.toastr.error(err.error);
    });
  }


  logout() {
    this.accountService.logout();
    this.toastr.show('Logged Out');
    this.router.navigateByUrl('/');
  }

}
