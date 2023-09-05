import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getReadingList, removeFromReadingList, undoRemoveFromReadingList } from '@tmo/books/data-access';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let mockStore: MockStore;
  let oc: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  const initialState = { entities: {}, ids: [], loaded: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule, NoopAnimationsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(getReadingList, []);
    oc = TestBed.inject(OverlayContainer);
    overlayContainerElement = oc.getContainerElement();
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

  it('should remove book from reading list and trigger UNDO action', () => {
    const book = createReadingListItem('B');
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    component.removeFromReadingList(book);
    const buttonElement: HTMLElement = overlayContainerElement.querySelector('.mat-simple-snackbar-action > button');
    buttonElement?.click();
    expect(mockStore.dispatch).toHaveBeenCalledWith(removeFromReadingList({ item: book }));
    expect(dispatchSpy).toHaveBeenCalledWith(undoRemoveFromReadingList({item: book}));
  });
  
});
