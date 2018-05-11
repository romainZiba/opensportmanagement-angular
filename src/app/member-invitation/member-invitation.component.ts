import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-member-invitation',
  templateUrl: './member-invitation.component.html',
  styleUrls: ['./member-invitation.component.css']
})
export class MemberInvitationComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;

  constructor() { }

  ngOnInit() {
  }

  saveUserAndNotify() {

  }
}
