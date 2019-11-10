// Testing all open/close buttons to see if they are working as expected
describe('Button tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should open people list when click button and close when clicked again', () => {
    cy.get('button')
      .contains('Open')
      .click();
    cy.contains('Rebekah Tempest').should('be.visible');

    cy.get('button')
      .contains('Open')
      .click();
    cy.contains('Gary Stevens').should('be.visible');

    cy.get('button')
      .contains('Open')
      .click();
    cy.contains('Ted Gonzalez').should('be.visible');

    cy.get('button')
      .contains('Close')
      .click();
    cy.contains('Rebekah Tempest').should('not.be.visible');

    cy.get('button')
      .contains('Close')
      .click();
    cy.contains('Gary Stevens').should('not.be.visible');

    cy.get('button')
      .contains('Close')
      .click();
    cy.contains('Ted Gonzalez').should('not.be.visible');
  });
});
