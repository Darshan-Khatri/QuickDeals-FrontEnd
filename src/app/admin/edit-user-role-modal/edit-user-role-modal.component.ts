import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-edit-user-role-modal',
  templateUrl: './edit-user-role-modal.component.html',
  styleUrls: ['./edit-user-role-modal.component.css']
})
export class EditUserRoleModalComponent implements OnInit {

  roleArray: string[] = [];
  title: string;
  closeBtnName: string;
  userRoles: Map<string, boolean> = new Map();
  availableRoles: string[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private adminService: AdminService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  updateUserRole() {
    this.bsModalRef.hide()
    this.userRoles.forEach((value, key) => {
      if (value) this.roleArray.push(key);
    });
    console.log('roleArray', this.roleArray);
    if(this.roleArray !== null && this.roleArray.length !== 0)
    this.editUserRole(this.roleArray);
  }

  editUserRole(roleEdited: any) {
    let username = this.title.slice(0, this.title.indexOf(' ')).toLowerCase();
    this.adminService.EditUserRole(username, roleEdited).subscribe(feedback => {
      console.log('Update Roles for ' + username, feedback);
      this.toastr.success(username + ' roles updated successfully');
    }, err => this.toastr.error(err.error));
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
