import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersPageComponent } from './pages/list/members-page.component';
import { SharedModule } from '../shared/shared.module';
import { MembersRoutingModule } from './members-routing.module';

@NgModule({
  declarations: [MembersPageComponent],
  imports: [CommonModule, SharedModule, MembersRoutingModule]
})
export class MembersModule {}
