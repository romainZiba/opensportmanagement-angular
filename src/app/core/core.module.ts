import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutComponent } from './components/layout.component';
import { NavItemComponent } from './components/nav-item.component';
import { SidenavComponent } from './components/sidenav.component';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { CoreState } from './store';
import { MatListModule, MatMenuModule, MatToolbarModule, MatButtonModule } from '@angular/material';

export const COMPONENTS = [LayoutComponent, NavItemComponent, SidenavComponent, ToolbarComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    NgxsModule.forFeature(CoreState)
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS
})
export class CoreModule {}
