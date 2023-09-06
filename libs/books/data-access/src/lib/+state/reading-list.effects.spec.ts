import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import {
  createBook,
  createReadingListItem,
  SharedTestingModule,
} from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', (done) => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });

  describe('addBook$', () => {
    it('should work', (done) => {
      const book = createBook('B');
      actions = new ReplaySubject();
      actions.next(ReadingListActions.addToReadingList({ book }));

      effects.addBook$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.confirmedAddToReadingList({ book })
        );
        done();
      });

      httpMock
        .expectOne('/api/reading-list')
        .flush(book, { status: 201, statusText: '' });
    });
    it('should return failedAddToReadingList with book, on fail', (done) => {
      const book = createBook('B');
      actions = new ReplaySubject();
      actions.next(ReadingListActions.addToReadingList({ book }));

      effects.addBook$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.failedAddToReadingList({ book })
        );
        done();
      });
      httpMock
        .expectOne(`/api/reading-list`)
        .flush(book, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('removeBook$', () => {
    it('should work', (done) => {
      const item = createReadingListItem('B');
      actions = new ReplaySubject();
      actions.next(ReadingListActions.removeFromReadingList({ item }));

      effects.removeBook$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.confirmedRemoveFromReadingList({ item })
        );
        done();
      });

      httpMock.expectOne(`/api/reading-list/${item.bookId}`).flush(item);
    });
    it('should return failedRemoveFromReadingList with readingItem, on fail', (done) => {
      const item = createReadingListItem('B');
      actions = new ReplaySubject();
      actions.next(ReadingListActions.removeFromReadingList({ item }));

      effects.removeBook$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.failedRemoveFromReadingList({ item })
        );
        done();
      });
      httpMock
        .expectOne(`/api/reading-list/${item.bookId}`)
        .flush(item, { status: 400, statusText: 'Cannot Delete Reading Item' });
    });
  });

  it('should check confirmedMarkAsRead has been invoked when markAsRead gets success', done => {
    actions = new ReplaySubject();
    const item = createReadingListItem('A');
    actions.next(ReadingListActions.markAsRead({ item }));

    effects.markAsRead$.subscribe(action => {
      expect(action).toEqual(
        ReadingListActions.confirmedMarkAsRead({
          item
        })
      );
      done();
    });

    httpMock.expectOne('/api/reading-list/A/finished').flush(item);
  });

  it('should check failedMarkAsRead has been invoked when markAsRead gets failed', done => {
    actions = new ReplaySubject();
    const item = createReadingListItem('B');
    actions.next(ReadingListActions.markAsRead({ item }));

    effects.markAsRead$.subscribe(action => {
      expect(action).toEqual(
        ReadingListActions.failedMarkAsRead({ item })
      );
      done();
    });

    httpMock.expectOne('/api/reading-list/B/finished').error(new ErrorEvent('Error'));
  });
  
});