import { DateSelectionComponent } from './date-selection.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';

@NgModule({
  declarations: [DateSelectionComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
  exports: [DateSelectionComponent]
})
export class DateSelectionModule {}
