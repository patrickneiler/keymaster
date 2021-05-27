import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GET_USERS_QUERY } from "../queries/users.queries";
import { UsersState, UserState } from "../states/users.state";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private apollo: Apollo) {}

  get users$(): Observable<UsersState | undefined> {
    return this.apollo
      .watchQuery<UsersState>({
        query: GET_USERS_QUERY,
      })
      .valueChanges.pipe(
        map((result) => {
          console.log(result);
          return result && result.errors ? undefined : result.data;
        })
      );
  }
}
