import {UserService} from "../../services/user.service";
import {Injectable} from "@angular/core";
import {UsersState} from "../../+state/reducer/user.reducer"
import {Store} from "@ngrx/store";
import {LoadUsers} from "../../+state/actions/user.actions";

@Injectable()
export class UserFacade {
    constructor(private usersSvc: UserService, private store: Store<UsersState>) {
    }

    /*Load Users*/
    public getUsers() {
        console.log("Inside facade")
        this.store.dispatch(new LoadUsers());
    }
}
