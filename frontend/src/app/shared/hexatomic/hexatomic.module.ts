import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LogoComponent } from "./atoms/logo/logo.component";
import { AvatarComponent } from "./atoms/avatar/avatar.component";
import { ListItemComponent } from "./molecules/list-item/list-item.component";
import { ListComponent } from "./organisms/list/list.component";
import { DragDropComponent } from "./organisms/drag-drop/drag-drop.component";
import { AdminTemplateComponent } from "./templates/admin/admin.component";
import {
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatIconModule,
  MatBadgeModule,
  MatButtonModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ProgressSpinnerComponent } from "./atoms/progress-spinner/progress-spinner.component";

@NgModule({
  declarations: [
    LogoComponent,
    AvatarComponent,
    ListItemComponent,
    ListComponent,
    DragDropComponent,
    AdminTemplateComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    DragDropModule,
  ],
  exports: [
    LogoComponent,
    AvatarComponent,
    ListItemComponent,
    ListComponent,
    DragDropComponent,
    AdminTemplateComponent,
    ProgressSpinnerComponent,
  ],
})
export class HexatomicModule {}
