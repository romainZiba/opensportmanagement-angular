import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BetweenDatesComponent } from './components/inputs/between-dates/between-dates.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListItemsSingleChoiceComponent } from './components/dialogs/list-dialog/list-items-single-choice.component';

const materialModule = [
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatSidenavModule,
  MatListModule,
  MatChipsModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatRadioModule,
  MatDialogModule,
  MatTabsModule
];

const components = [ListItemsSingleChoiceComponent, BetweenDatesComponent];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, materialModule],
  declarations: [...components],
  exports: [...materialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, ...components],
  entryComponents: [ListItemsSingleChoiceComponent]
})
export class SharedModule {}
