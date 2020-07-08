import { Component, OnInit } from '@angular/core';
import {
  User,
  UserFacade,
} from '@readers-digest/readers-digest/user/data-access';
import { log } from 'util';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'readers-digest-users-list',
  templateUrl: './users.list.component.html',
  styleUrls: ['./users.list.component.css'],
})
export class UsersListComponent implements OnInit {
  //Observables for State
  // public users$: Observable<User[]> = of([
  //   { id: 1, username: 'Nation', name: 'Chirara', role: 'Admin' },
  //   { id: 1, username: 'Jim', name: 'Chirara', role: 'User' },
  // ]);

  public users$: Observable<User[]>;
  public error$: Observable<any>;
  constructor(private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userFacade.getUsers();
    this.users$ = this.userFacade.users$;
    //this.users$ = this.userFacade.error$;
  }
}
