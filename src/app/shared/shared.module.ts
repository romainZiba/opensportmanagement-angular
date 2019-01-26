import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BetweenDatesComponent } from './components/inputs/between-dates/between-dates.component';
import {
  MatRadioModule,
  MatDialogModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [BetweenDatesComponent];
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
  exports: [...components]
})
export class SharedModule {}
