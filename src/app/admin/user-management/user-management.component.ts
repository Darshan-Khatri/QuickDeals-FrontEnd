import { TitleCasePipe } from '@angular/common';
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
    this.adminService.GetUserRole(username).subscribe(response => {
      this.roles = response;
      console.log(this.roles);
    }, err => console.log(err),
      () => this.openModalWithComponent(username)
    );
  }

  openModalWithComponent(username: string) {
    const initialState = {
      class: 'modal-dialog-centered',
      list: this.roles,
      title: `${username} roles`,
    };
    this.bsModalRef = this.bsModalService.show(EditUserRoleModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
