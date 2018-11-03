import { Component, Inject, OnInit } from '@angular/core';
import { List } from 'immutable';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-items-single-choice.component.html',
  styleUrls: ['./list-items-single-choice.component.scss']
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
