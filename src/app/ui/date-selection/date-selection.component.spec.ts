import { async, TestBed } from '@angular/core/testing';
import { DateSelectionComponent } from './date-selection.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentTester } from 'ngx-speculoos';

class DateSelectionComponentTester extends ComponentTester<DateSelectionComponent> {
  constructor() {
    super(DateSelectionComponent);
  }

  get inputFromDate() {
    return this.input('input[name="fromDate"]');
  }

  get inputToDate() {
    return this.input('input[name="toDate"]');
  }

  get form() {
    return this.element('form');
  }

  get isFromDateValid() {
    return this.componentInstance.form.controls['fromDate'].valid;
  }

  get isToDateValid() {
    return this.componentInstance.form.controls['toDate'].valid;
  }

  get fromDateMinDateError() {
    return this.componentInstance.form.controls['fromDate'].getError('minDate');
  }

  get toDateMinDateError() {
    return this.componentInstance.form.controls['toDate'].getError('minDate');
  }

  get isValid() {
    return this.componentInstance.form.valid;
  }
}

describe('DateSelectionComponent', () => {
  let tester: DateSelectionComponentTester;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [DateSelectionComponent],
      providers: [FormBuilder]
    }).compileComponents();
  }));

  beforeEach(() => {
    fb = TestBed.get(FormBuilder);
    tester = new DateSelectionComponentTester();
    tester.componentInstance.form = fb.group({});
    tester.componentInstance.minDate = moment('2018-11-01 09:30:26');
    tester.detectChanges();
  });

  describe('init', () => {
    it('should create', () => {
      expect(tester.componentInstance).toBeTruthy();
    });

    it('should have fromDate filled', () => {
      expect(tester.inputFromDate.value).toEqual('2018-11-01');
    });

    it('should have toDate filled', () => {
      expect(tester.inputToDate.value).toEqual('2018-11-01');
    });

    it('should be valid form', () => {
      expect(tester.isFromDateValid).toBeTruthy();
      expect(tester.isToDateValid).toBeTruthy();
      expect(tester.isValid).toEqual(true);
    });
  });

  describe('change from date', () => {
    it('should be invalid when from date is before min date', () => {
      tester.inputFromDate.fillWith('2018-01-01');
      expect(tester.isFromDateValid).toBeFalsy();
      expect(tester.isToDateValid).toBeTruthy();
      expect(tester.isValid).toBeFalsy();
      expect(tester.fromDateMinDateError).toEqual({
        actual: '2018-01-01',
        minDate: '2018-11-01'
      });
    });

    it('should be invalid when toDate is before fromDate', () => {
      tester.inputFromDate.fillWith('2018-12-01');
      expect(tester.isFromDateValid).toBeTruthy();
      expect(tester.isToDateValid).toBeFalsy();
      expect(tester.isValid).toBeFalsy();
      expect(tester.toDateMinDateError).toEqual({
        actual: '2018-11-01',
        minDate: '2018-12-01'
      });
    });
  });
});
