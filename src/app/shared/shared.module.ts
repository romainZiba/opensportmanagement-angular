import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BetweenDatesComponent } from './components/inputs/between-dates/between-dates.component';
import { ListItemsSingleChoiceComponent } from './components/dialogs/list-dialog/list-items-single-choice.component';
import {
  MatRadioModule,
  MatDialogModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [ListItemsSingleChoiceComponent, BetweenDatesComponent];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  declarations: [...components],
  exports: [...components],
  entryComponents: [ListItemsSingleChoiceComponent]
})
export class SharedModule {}
