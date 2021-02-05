import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Member } from 'src/app/models/member';
import { AdminService } from 'src/app/Service/admin.service';
import { MemberService } from 'src/app/Service/member.service';
import { EditUserRoleModalComponent } from '../edit-user-role-modal/edit-user-role-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  bsModalRef: BsModalRef;
  members: Partial<Member[]> = [];
  roles: string[] = [];
  roleObject = new Map();
  constructor(
    private bsModalService: BsModalService,
    private memberService: MemberService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.GetMembers().subscribe(response => {
      this.members = response;
    })
  }

  GetUserRole(username: string) {
    this.roleObject.clear();
    this.adminService.GetUserRole(username).subscribe(response => {
      this.roles = response;
      this.roles.forEach(x => this.roleObject.set(x, true));
      console.log(this.roles);
      console.log('Role object', this.roleObject);
    }, err => console.log(err),
      () => this.openModalWithComponent(username)
    );
  }

  openModalWithComponent(username: string) {
    const initialState = {
      class: 'modal-dialog-centered',
      userRoles: this.roleObject,
      availableRoles: ['Admin', 'Member', 'Moderator'],
      title: `${username} roles`,
    };
    this.bsModalRef = this.bsModalService.show(EditUserRoleModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }




}
