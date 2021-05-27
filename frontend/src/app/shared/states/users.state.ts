import { GroupState } from "./groups.state";

export interface UserState {
  username: string;
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  groups?: GroupState[];
}

export interface UsersState {
  users: UserState[];
}
