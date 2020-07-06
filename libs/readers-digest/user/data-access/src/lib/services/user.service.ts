import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {retry} from "rxjs/operators";
import {User} from "../../lib/model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public getUsers():Observable<User[]> {
    console.log("Service call...")
    return this.http.get<User[]>("http://localhost:8081/api/v1/users/test");
  }
}
