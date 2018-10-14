import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from "./components/layout.component";
import { NavItemComponent } from "./components/nav-item.component";
import { SidenavComponent } from "./components/sidenav.component";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { TeamEffects } from "./store/effects";
import { ListItemsSingleChoiceComponent } from "./components/list-dialog/list-items-single-choice.component";

export const COMPONENTS = [
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
  ListItemsSingleChoiceComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature("core", reducers),
    EffectsModule.forFeature([TeamEffects])
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  entryComponents: [ListItemsSingleChoiceComponent]
})
export class CoreModule {}
