import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { GroupsService } from "@app/shared/services/groups.service";
import { UsersService } from "@app/shared/services/users.service";
import { GroupsState, GroupState } from "@app/shared/states/groups.state";
import { UsersState, UserState } from "@app/shared/states/users.state";
import { Observable } from "rxjs";

import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { MatExpansionPanel } from "@angular/material/expansion";

@Component({
  selector: "hexatomic-drag-drop",
  templateUrl: "./drag-drop.component.html",
  styleUrls: ["./drag-drop.component.scss"],
})
export class DragDropComponent implements OnInit {
  @Input() from: any;
  @Input() to: any;
  @Output() action = new EventEmitter();
  public users$: Observable<UsersState | undefined>;
  public groups$: Observable<GroupsState | undefined>;

  constructor(private users: UsersService, private groups: GroupsService) {
    this.users$ = this.users.users$;
    this.groups$ = this.groups.groups$;
  }

  ngOnInit(): void {}

  noReturnPredicate() {
    return false;
  }

  addItemToList(event: CdkDragDrop<string[]>, destinationId: string) {
    if (event.previousContainer !== event.container) {
      this.action.emit({
        payload: {
          listId: destinationId,
          itemId: event.item.data.id,
        },
        type: 0,
      });
    }
  }

  removeItemFromList(listId: string, itemId: string) {
    this.action.emit({
      payload: {
        listId,
        itemId,
      },
      type: 1,
    });
  }

  openExpansionPanel(event: CdkDragDrop<string[]>) {
    console.log(event);
  }
}
