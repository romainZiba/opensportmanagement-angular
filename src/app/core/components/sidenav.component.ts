import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  template: `
    <mat-sidenav style="margin-top: 56px" #sidenav [opened]="open" (keydown.escape)="sidenav.close()" (closedStart)="closeMenu.emit()"
                 disableClose>
      <mat-nav-list>
        <ng-content></ng-content>
      </mat-nav-list>
    </mat-sidenav>
  `
})
export class SidenavComponent {
  @Input()
  open = false;
  @Output()
  closeMenu = new EventEmitter();
}
