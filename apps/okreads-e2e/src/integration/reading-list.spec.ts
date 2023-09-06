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

  it('Then: I should able to mark reading book as finished', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]')
      .find('.mat-flat-button')
      .not('[disabled]')
      .eq(1)
      .click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('.reading-list-content')
      .find('.reading-list-item .finish-btn')
      .not('[disabled]')
      .eq(0)
      .click();

    cy.get('.reading-list-item .reading-list-finish').contains('Finished');
  });
  
});
