import { UserState } from "./users.state";

export interface GroupState {
  id?: string;
  name: string;
  users: UserState[];
}

export interface GroupsState {
  groups: GroupState[];
}
