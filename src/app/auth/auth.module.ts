import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login.component";
import { LoginPageComponent } from "./pages/login-page.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "./store";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AuthRoutingModule,
    NgxsModule.forFeature([AuthState])
  ],
  exports: [LoginComponent, LoginPageComponent],
  declarations: [LoginPageComponent, LoginComponent]
})
export class AuthModule {}
