describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to add book to reading list and UNDO it on clicking UNDO button in the snackbar', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]')
      .find('[data-testing-btn="add-book-button"]')
      .not('[disabled]')
      .eq(1)
      .click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('.reading-list-content')
      .find('.reading-list-item .mat-remove-btn')
      .eq(0)
      .click();

    cy.get('.mat-snack-bar-container .mat-simple-snackbar').should(
      'contain.text',
      'Removed'
    );
    cy.get('.mat-snack-bar-container')
      .get('.mat-simple-snackbar-action > .mat-focus-indicator')
      .contains('Undo');
  })

});
