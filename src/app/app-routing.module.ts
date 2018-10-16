import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/events", pathMatch: "full" },
  { path: "login", loadChildren: "./auth/auth.module#AuthModule" },
  { path: "events", loadChildren: "./teams/teams.module#TeamsModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
