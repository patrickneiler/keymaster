import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import {
  GET_GROUPS_QUERY,
  ADD_USER_TO_GROUP_MUTATION,
  REMOVE_USER_FROM_GROUP_MUTATION,
} from "../queries/groups.queries";
import { GroupsState, GroupState } from "../states/groups.state";

@Injectable({
  providedIn: "root",
})
export class GroupsService {
  constructor(private apollo: Apollo, private snackbar: MatSnackBar) {}

  get groups$(): Observable<GroupsState | undefined> {
    return this.apollo
      .watchQuery<GroupsState>({
        query: GET_GROUPS_QUERY,
      })
      .valueChanges.pipe(
        debounceTime(500),
        map((result) => {
          console.log(result);
          return result && result.errors ? undefined : result.data;
        })
      );
  }

  public addUserToGroup(groupId: string, userId: string): void {
    this.apollo
      .mutate<GroupsState>({
        mutation: ADD_USER_TO_GROUP_MUTATION,
        variables: { groupId, userId },
      })
      .toPromise()
      .then((result) => {
        result.errors ? this.openSnackBar(true) : this.openSnackBar(false);
      });
  }

  public removeUserFromGroup(groupId: string, userId: string): void {
    this.apollo
      .mutate<GroupsState>({
        mutation: REMOVE_USER_FROM_GROUP_MUTATION,
        variables: { groupId, userId },
      })
      .toPromise()
      .then((result) => {
        result.errors ? this.openSnackBar(true) : this.openSnackBar(false);
      });
  }

  openSnackBar(error?: boolean) {
    const message = error ? "Something went wrong" : "Success!";
    this.snackbar.open(message, "Dismiss", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}
