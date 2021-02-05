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
  userRoles: Map<string, boolean> = new Map();
  availableRoles: string[] = [];
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  updateUserRole() {
    this.bsModalRef.hide()
  }

  GetUpdateUserRole(role: string) {
    console.log('role changed', role);
    if (this.userRoles.has(role)) {
      this.userRoles.set(role, !(this.userRoles.get(role)));
    }
    else this.userRoles.set(role, true);
    console.log('userRoles', this.userRoles);
  }
}
