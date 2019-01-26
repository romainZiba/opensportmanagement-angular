import { Component, Inject, OnInit } from '@angular/core';
import { List } from 'immutable';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss']
})
export class ListDialogComponent implements OnInit {
  title: string;
  elements: List<DialogElement>;
  selectedElement: DialogElement;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ListDialogConfiguration) {
    this.title = data.title;
    this.elements = data.elements;
  }

  ngOnInit() {}
}

export interface ListDialogConfiguration {
  title: string;
  elements: List<DialogElement>;
}

export interface DialogElement {
  id: number;
  payload: string;
}
