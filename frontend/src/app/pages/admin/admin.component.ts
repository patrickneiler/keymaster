import { Component, OnInit } from "@angular/core";
import { GroupsService } from "@app/shared/services/groups.service";
import { UsersService } from "@app/shared/services/users.service";
import { GroupsState } from "@app/shared/states/groups.state";
import { UsersState } from "@app/shared/states/users.state";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";

interface DragDropAction {
  payload: DropActionPayload;
  type: ActionTypes;
}

interface DropActionPayload {
  listId: string;
  itemId: string;
}

enum ActionTypes {
  ADD = 0,
  REMOVE = 1,
}

interface HexatomicList {
  title?: string;
  items: HexatomicListItem[];
}

interface HexatomicListItem {
  label: string;
  avatar?: string;
  data: any;
  items?: HexatomicListItem[];
}

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  public users$: Observable<UsersState | undefined>;
  public groups$: Observable<GroupsState | undefined>;
  public userList$: Observable<HexatomicList>;
  public groupList$: Observable<HexatomicList>;

  constructor(private users: UsersService, private groups: GroupsService) {
    this.users$ = this.users.users$;
    this.groups$ = this.groups.groups$;
    this.userList$ = of({
      title: "Players",
      items: [],
    });
    this.groupList$ = of({
      title: "Player Lobbies",
      items: [],
    });
  }

  ngOnInit() {
    this.userList$ = this.userList;
    this.groupList$ = this.groupList;
  }

  actionHandler(event: DragDropAction) {
    event.type === ActionTypes.ADD
      ? this.groups.addUserToGroup(event.payload.listId, event.payload.itemId)
      : this.groups.removeUserFromGroup(
          event.payload.listId,
          event.payload.itemId
        );
  }

  get userList(): Observable<HexatomicList> {
    return this.userList$.pipe(
      switchMap((players) =>
        this.users$.pipe(
          map((users) => {
            return {
              ...players,
              items: users
                ? users.users.map((user) => {
                    return {
                      label: user.username,
                      avatar: "https://i.pravatar.cc/160?img=" + user.id,
                      data: user,
                    };
                  })
                : [],
            };
          })
        )
      )
    );
  }

  get groupList(): Observable<HexatomicList> {
    return this.groupList$.pipe(
      switchMap((lobbies) =>
        this.groups$.pipe(
          map((groups) => {
            return {
              ...lobbies,
              items: groups
                ? groups.groups.map((group) => {
                    return {
                      label: group.name,
                      data: group,
                      items: group.users
                        ? group.users.map((user) => {
                            return {
                              label: user.username,
                              data: user,
                              avatar:
                                "https://i.pravatar.cc/160?img=" + user.id,
                            };
                          })
                        : [],
                    };
                  })
                : [],
            };
          })
        )
      )
    );
  }
}
