import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'readers-digest-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input("error") error: string;
  @Output("login") login: EventEmitter<AuthModel> = new EventEmitter<AuthModel>();

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder) {
    this.loginForm= this.formBuilder.group({
      username:[],
      password:[]
    });
  }

  ngOnInit(): void {
  }

  public submit(): void {
    //get values here
    let authObj: AuthModel = {username: "", password: ""};
    this.login.emit(authObj);
  }

}
