import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatRadioModule,
  MatToolbarModule
} from "@angular/material";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatDatepickerModule } from "@angular/material/datepicker";

const materialModule = [
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
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
  MatDialogModule
];

@NgModule({
  imports: [CommonModule, FormsModule, materialModule],
  declarations: [],
  exports: [...materialModule, FormsModule]
})
export class SharedModule {}
