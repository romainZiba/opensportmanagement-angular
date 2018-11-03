import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from "./components/layout.component";
import { NavItemComponent } from "./components/nav-item.component";
import { SidenavComponent } from "./components/sidenav.component";
import { RouterModule } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { TeamService } from "./services/team.service";
import { CoreState } from "./store";

export const COMPONENTS = [
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgxsModule.forFeature(CoreState)
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: [TeamService]
})
export class CoreModule {
}
