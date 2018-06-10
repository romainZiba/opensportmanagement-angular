import {Component, OnInit} from '@angular/core';
import {Place, PlaceType} from '../model/place';
import {PlaceService} from '../services/place.service';
import {TeamService} from '../services/team.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {EventCreationComponent} from '../event-creation/event-creation.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-place-creation',
  templateUrl: './place-creation.component.html',
  styleUrls: ['./place-creation.component.css']
})
export class PlaceCreationComponent implements OnInit {

  form: FormGroup;
  nameControl = new FormControl('', Validators.required);
  addressControl = new FormControl('', Validators.required);
  cityControl = new FormControl('', Validators.required);
  types = Object.values(PlaceType).filter(value => typeof value === 'string');
  typeControl = new FormControl(this.types[0], Validators.required);

  constructor(private dialogRef: MatDialogRef<EventCreationComponent>,
              private teamService: TeamService,
              private placeService: PlaceService,
              private snackBar: MatSnackBar,
              fb: FormBuilder) {
    this.form = fb.group({
      nameControl: this.nameControl,
      addressControl: this.addressControl,
      cityControl: this.cityControl,
      typeControl: this.typeControl
    });
  }

  ngOnInit() {}

  createPlace() {
    const place = new Place();
    place.name = this.nameControl.value;
    place.address = this.addressControl.value;
    place.city = this.cityControl.value;
    place.type = this.typeControl.value;
    this.teamService.selectedTeam$.subscribe(selectedTeam =>
      this.placeService.createPlace(selectedTeam._id, place).then(
        success => {
          if (success) {
            // TODO: i18n
            this.openSnackBar('Lieu créé avec succès');
            this.dialogRef.close();
          } else {
            this.openSnackBar('Une erreur s\'est produite');
          }

        }, () => this.openSnackBar('Une erreur s\'est produite')
      )
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,  '',  {
      duration: 2000,
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
