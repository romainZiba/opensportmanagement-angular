import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutState } from './layout.state';
import { CloseSidenav, OpenSidenav } from './layout.actions';

describe('Layout', () => {
  let store: Store;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxsModule.forRoot([LayoutState])]
    });

    store = TestBed.get(Store);
  });

  it('should open the sidenav', async(() => {
    store.dispatch(new OpenSidenav());
    store.selectOnce(state => state.layoutState).subscribe(layoutState => {
      expect(layoutState).toEqual({
        showSidenav: true
      });
    });
  }));

  it('should close the sidenav', async(() => {
    store.dispatch(new CloseSidenav());
    store.selectOnce(state => state.layoutState).subscribe(layoutState => {
      expect(layoutState).toEqual({
        showSidenav: false
      });
    });
  }));
});
