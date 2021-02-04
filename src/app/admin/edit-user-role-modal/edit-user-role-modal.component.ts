import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-user-role-modal',
  templateUrl: './edit-user-role-modal.component.html',
  styleUrls: ['./edit-user-role-modal.component.css']
})
export class EditUserRoleModalComponent implements OnInit {

  title: string;
  closeBtnName: string;
  list: any[] = [];
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  updateUserRole() {
    this.bsModalRef.hide()
  }
}
