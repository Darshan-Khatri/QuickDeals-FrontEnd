import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditUserRoleModalComponent } from '../edit-user-role-modal/edit-user-role-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor(private bsModalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModalWithComponent() {

    const initialState = {
      class : 'modal-dialog-centered',
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'title',
    };
    this.bsModalRef = this.bsModalService.show(EditUserRoleModalComponent, {initialState} );
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.submitBtnName = 'Submit';
  }

}
