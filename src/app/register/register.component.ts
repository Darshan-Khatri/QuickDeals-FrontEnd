import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../Service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe((user) => {
      this.toastr.success(user.username.toUpperCase() +" happy shopping and save money");
      this.router.navigateByUrl('/frontPage');
    },
    (err) => this.toastr.error(err.error));
  }

  cancel() {
    this.router.navigateByUrl('/');
  }
}
