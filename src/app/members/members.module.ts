import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersPageComponent } from './pages/list/members-page.component';
import { MembersRoutingModule } from './members-routing.module';

@NgModule({
  declarations: [MembersPageComponent],
  imports: [CommonModule, MembersRoutingModule]
})
export class MembersModule {}
