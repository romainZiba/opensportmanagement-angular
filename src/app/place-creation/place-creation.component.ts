import {Component, OnInit} from '@angular/core';
import {Place, PlaceType} from '../model/place';
import {PlaceService} from '../services/place.service';
import {TeamService} from '../services/team.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {EventCreationComponent} from '../event-creation/event-creation.component';

@Component({
  selector: 'app-place-creation',
  templateUrl: './place-creation.component.html',
  styleUrls: ['./place-creation.component.css']
})
export class PlaceCreationComponent implements OnInit {

  name: string;
  address: string;
  city: string;
  selectedType: PlaceType;
  types = Object.values(PlaceType).filter(value => typeof value === 'string');

  constructor(private dialogRef: MatDialogRef<EventCreationComponent>,
              private teamService: TeamService,
              private placeService: PlaceService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {}

  createPlace(name: string, address: string, city: string, type: PlaceType) {
    const place = new Place();
    place.name = name;
    place.address = address;
    place.city = city;
    place.type = type;
    this.teamService.selectedTeam$.subscribe(selectedTeam =>
      this.placeService.createPlace(selectedTeam._id, place).then(
        () => {
          this.openSnackBar('Place successfully created');
          this.dialogRef.close();
        }, () => this.openSnackBar('An error occurred')
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
