import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class HelperService {

  constructor() { }

  public groupBy(list, iteratee) {
    return _.groupBy(list, iteratee);
  }
}
