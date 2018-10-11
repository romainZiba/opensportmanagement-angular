import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-toolbar",
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="openMenu.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <ng-content></ng-content>
      <button mat-icon-button (click)="changeTeam.emit()">
        <mat-icon>swap_horiz</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent {
  @Output()
  openMenu = new EventEmitter();
  @Output()
  changeTeam = new EventEmitter();
}
