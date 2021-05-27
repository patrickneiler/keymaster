import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersService } from "./services/users.service";
import { GroupsService } from "./services/groups.service";
import { HexatomicModule } from "./hexatomic/hexatomic.module";
import { MatSnackBarModule } from "@angular/material";

@NgModule({
  declarations: [],
  imports: [CommonModule, HexatomicModule, MatSnackBarModule],
  providers: [UsersService, GroupsService],
  exports: [HexatomicModule],
})
export class SharedModule {}
