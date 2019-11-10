// Testing if check-in button are working as expected and are changing summary of people checked in
describe('Check In', () => {
  it('Should be able to check in', () => {
    cy.get('button')
      .contains('Open')
      .click();

    cy.contains('Check-in').click();

    cy.contains('Check-out').should('exist');

    cy.contains('People in the event right now: 1').should('exist');
  });

  it('Should be able to check out', () => {
    cy.get('button')
      .contains('Open')
      .click();

    cy.contains('Check-in').click();

    cy.contains('Check-out').click();

    cy.contains('Check-in').should('exist');

    cy.contains('People in the event right now: 0').should('exist');
  });
});
