import {MatSnackBar} from '@angular/material';

export abstract class BaseComponent {
  constructor(private snackBar: MatSnackBar) {}

  protected openSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000
    });
  }
}
