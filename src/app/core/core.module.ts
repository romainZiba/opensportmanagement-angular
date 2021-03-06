import { Api } from './models/api';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutComponent } from './components/layout.component';
import { NavItemComponent } from './components/nav-item.component';
import { SidenavComponent } from './components/sidenav.component';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { CoreState } from './store';
import { MatListModule, MatMenuModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { TEAMS_API } from './token';
import { TeamService } from './services/team.service';
import { TeamMockService } from './services/team-mock.service';
import { TeamHttpService } from './services/team-http.service';
import { ListDialogModule } from '../ui/list-dialog/list-dialog.module';

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
    ListDialogModule,
    NgxsModule.forFeature(CoreState)
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS
})
export class CoreModule {
  static forRoot(teamsApi: Api): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: TEAMS_API,
          useValue: teamsApi.baseUrl
        },
        {
          provide: TeamService,
          useClass: teamsApi.useMock ? TeamMockService : TeamHttpService
        }
      ]
    };
  }
}
