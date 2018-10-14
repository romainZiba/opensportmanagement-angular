import { Component, Inject, OnInit } from "@angular/core";
import { List } from "immutable";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-list-dialog",
  template: `
    <h2 mat-dialog-title>{{ title }}</h2>
    <mat-dialog-content>
      <mat-radio-group [(ngModel)]="selectedElement" class="radio-group">
        <mat-radio-button *ngFor="let element of elements" [value]="element">{{ element.payload }}</mat-radio-button>
      </mat-radio-group>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="null">Cancel</button>
      <button mat-button [mat-dialog-close]="selectedElement">OK</button>
    </mat-dialog-actions>
  `,
  styleUrls: ["./list-items-single-choice.component.scss"]
})
export class ListItemsSingleChoiceComponent implements OnInit {
  title: string;
  elements: List<DialogElement>;
  selectedElement: DialogElement;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ListItemsSingleChoiceData) {
    this.title = data.title;
    this.elements = data.elements;
  }

  ngOnInit() {}
}

export interface ListItemsSingleChoiceData {
  title: string;
  elements: List<DialogElement>;
}

export interface DialogElement {
  id: number;
  payload: string;
}
