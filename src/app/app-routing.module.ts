import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'events', loadChildren: './wrapper/events-wrapper.module#EventsWrapperModule' },
  { path: 'members', loadChildren: './members/members.module#MembersModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
