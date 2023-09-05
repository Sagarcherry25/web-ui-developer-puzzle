describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  xit('Then: I should see search results as I am typing', () => {
    // TODO: Implement this test!
  });

  it('Then: I should be able to see snackbar with Undo action when book added to reading list', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]')
      .find('[data-testing-btn="add-book-button"]')
      .not('[disabled]')
      .eq(1)
      .click();

    cy.get('.mat-snack-bar-container').contains('Added');
    cy.get('.mat-snack-bar-container')
      .get('.mat-simple-snackbar-action > .mat-focus-indicator')
      .contains('Undo');
  });
  
});
