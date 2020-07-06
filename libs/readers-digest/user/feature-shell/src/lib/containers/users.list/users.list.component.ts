import { Component, OnInit } from '@angular/core';
import {User, UserFacade} from "@readers-digest/readers-digest/user/data-access";
import {log} from "util";

@Component({
  selector: 'readers-digest-users-list',
  templateUrl: './users.list.component.html',
  styleUrls: ['./users.list.component.css']
})
export class UsersListComponent implements OnInit {

  public users:User[];
  constructor(private userFacade:UserFacade) { }

  ngOnInit(): void {
    this.userFacade.getUsers();
  }

}
