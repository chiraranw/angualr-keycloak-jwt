import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@readers-digest/readers-digest/user/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'readers-digest-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Input('users') users$: Observable<User[]>;
  @Input('error') error: string;
  @Output('delete') delete: EventEmitter<any> = new EventEmitter<any>();
  @Output('edit') edit: EventEmitter<User> = new EventEmitter<User>();

  constructor() {}

  ngOnInit(): void {}
}
