import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, undoRemoveFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private _snackBar: MatSnackBar) {}

  removeFromReadingList(item: ReadingListItem) {
    const _snackBarRef = this._snackBar.open(
      `Removed ${item.title} book from the reading list`,
      'Undo',
      {
        duration: 4000,
      }
    );
    this.store.dispatch(removeFromReadingList({ item }));

    _snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(undoRemoveFromReadingList({ item }));
    });
  }
}
