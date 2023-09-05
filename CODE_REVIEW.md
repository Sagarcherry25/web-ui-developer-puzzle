#### Code Smells/Improvements:
  - `failedAddToReadingList` and `failedRemoveFromReadingList` unit tests are failing in `reading-list.reducer.spec.ts` file due to missing reducer functions code for above actions.  (`Fixed`)
  - Added async pipe as improvement in book search component for getAllBooks selector instead of adding response into new variable (`Fixed`).
  - Error handling need to be done when there are no books with search text. (`Fixed`).
  - Added missing unit tests for `addBook$` and `removeBook$` in reading-list effects. (`Fixed`).
  - Added missing unit tests for book-search component and reading-list component. (`Fixed`).
#### Accessibility issues identified (Automated scan- Light house analysis):
  - `Background and Foreground colors do not have a sufficient contrast ratio.` (`Fixed`).
  - `Buttons do not have an accessible name`
#### Accessibility issues identified (Manually):
  - Focus is missing for books list after search (`Fixed`).
  - `search` button `aria-label` is missing. (`Fixed`).
  - Reading List `close` button `aria-label` is missing. (`Fixed`).
  - Images need to have `alt` attribute (`Fixed`).

* lint and e2e are passing