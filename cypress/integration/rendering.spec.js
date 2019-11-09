describe('Rendering tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should have a spinner when loading', () => {
    cy.get('.spin').should('be.visible');
  });

  it('Check if it render list of communities', () => {
    cy.contains('Challenge').should('be.visible');
    cy.contains('Great Code').should('be.visible');
    cy.contains('I love code').should('be.visible');
  });

  it('People list should not be visible', () => {
    cy.contains('Rebekah Tempest').should('not.be.visible');
    cy.contains('Gary Stevens').should('not.be.visible');
    cy.contains('Ted Gonzalez').should('not.be.visible');
  });
});
