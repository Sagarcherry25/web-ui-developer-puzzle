import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let mockStore: MockStore;
  const initialState = { entities: {}, ids: [], loaded: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(getReadingList, []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call remove from reading list action with correct reading book', () => {
    const item = createReadingListItem('A');
    const expectedAction = removeFromReadingList({ item });
    spyOn(mockStore, 'dispatch').and.callThrough();
    component.removeFromReadingList(item);
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
  
});
