import {Component, OnInit} from '@angular/core';
import {AuthService} from "@readers-digest/auth/data-access-auth";
import {catchError, tap} from "rxjs/operators";
import {log} from "util";
import {of} from "rxjs";

@Component({
    selector: 'readers-digest-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private s: AuthService) {
    }

    ngOnInit(): void {
        this.s.testMethod().pipe(
            tap(res=>console.log("Data..",res)),
            catchError(err => of(console.log("Error...",err)))
        ).subscribe();

    }

}
