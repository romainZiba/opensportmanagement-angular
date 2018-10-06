import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OverlayModule } from "@angular/cdk/overlay";
import { MatButtonModule, MatTooltipModule } from "@angular/material";
import { SpeedDialOptionDirective } from "./speed-dial-option.directive";
import { SpeedDialComponent } from "./speed-dial.component";
import { SpeedDialTriggerDirective } from "./speed-dial-trigger.directive";

@NgModule({
  imports: [CommonModule, OverlayModule, MatButtonModule, MatTooltipModule],
  declarations: [
    SpeedDialOptionDirective,
    SpeedDialComponent,
    SpeedDialTriggerDirective
  ],
  exports: [
    SpeedDialOptionDirective,
    SpeedDialComponent,
    SpeedDialTriggerDirective
  ]
})
export class SpeedDialModule {}
