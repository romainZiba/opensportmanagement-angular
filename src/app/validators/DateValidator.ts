import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {FORMAT_DATE} from '../app.module';
import * as moment from 'moment';
import {Moment} from 'moment';

export class DateValidator {
  static dateMinimum(date: Moment): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      const inputDate = moment(control.value);
      if (!inputDate.isValid()) {
        return null;
      }
      return inputDate.isSameOrAfter(date)
        ? null
        : {
            minDate: {
              minDate: date.format(FORMAT_DATE),
              actual: inputDate.format(FORMAT_DATE)
            }
          };
    };
  }
}
