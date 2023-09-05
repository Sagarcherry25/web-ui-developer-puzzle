import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const init = createAction('[Reading List] Initialize');

export const loadReadingListSuccess = createAction(
  '[Reading List API] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List API] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Books Search Results] Add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List API] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List API] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Books Search Results] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List API] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List API] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);

export const undoAddBookToReadingList = createAction(
  '[Reading List] Undo add Book to reading list',
  props<{ book: Book }>()
);

export const undoAddBookToReadingListSuccess = createAction(
  '[Reading List] Undo add Book to reading list Success',
  props<{ book: Book }>()
);

export const failedUndoAddBookToReadingList = createAction(
  '[Reading List] Undo add Book to reading list Failed',
  props<{ book: Book }>()
);

export const undoRemoveFromReadingList = createAction(
  '[Reading List] Undo Remove Book from reading list',
  props<{ item: ReadingListItem }>()
);

export const undoRemoveFromReadingListSuccess = createAction(
  '[Reading List] Undo Remove Book from reading list Sucess',
  props<{ item: ReadingListItem }>()
);

export const failedUndoRemoveFromReadingList = createAction(
  '[Reading List] Undo Remove Book from reading list Failed',
  props<{ item: ReadingListItem }>()
);
