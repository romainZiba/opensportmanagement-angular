import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { DateValidator, FORMAT_DATE } from "../../../validators/date-validator";
import * as moment from "moment";
import { distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "shared-between-dates",
  templateUrl: "between-dates.component.html",
  styleUrls: ["between-dates.component.scss"]
})
export class BetweenDatesComponent implements OnInit {
  @Input()
  form: FormGroup;
  @Input()
  minDate: moment.Moment;

  fromDateCtrl: FormControl;
  toDateCtrl: FormControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.fromDateCtrl = this.fb.control(this.minDate.format(FORMAT_DATE), [
      Validators.required,
      DateValidator.dateMinimum(this.minDate.startOf("day"))
    ]);

    this.toDateCtrl = this.fb.control(this.minDate.format(FORMAT_DATE), [
      Validators.required,
      DateValidator.dateMinimum(this.minDate.startOf("day"))
    ]);

    this.fromDateCtrl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(newValue => {
        this.toDateCtrl.clearValidators();
        this.toDateCtrl.setValidators([
          Validators.required,
          DateValidator.dateMinimum(moment(newValue))
        ]);
        this.toDateCtrl.updateValueAndValidity();
      });

    this.form.addControl("fromDate", this.fromDateCtrl);
    this.form.addControl("toDate", this.toDateCtrl);
  }
}
