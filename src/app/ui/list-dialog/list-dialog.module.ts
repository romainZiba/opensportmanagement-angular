import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ListDialogComponent } from './list-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ListDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  entryComponents: [ListDialogComponent]
})
export class ListDialogModule {}
