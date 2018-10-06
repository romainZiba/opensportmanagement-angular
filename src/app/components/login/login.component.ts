import { Component, EventEmitter, Output } from "@angular/core";
import { Credentials } from "../../model/credentials";

@Component({
  selector: "login-form",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  hide = true;

  @Output("credentials")
  credentialsEmitter = new EventEmitter<Credentials>();

  onLogin(username: string, password: string): void {
    this.credentialsEmitter.emit(new Credentials(username, password));
  }
}
