describe('LearnVault Tests', () => {
  it('Visits the LearnVault', () => {
    cy.visit('http://localhost:8080');
    cy.contains('All Collections');
    cy.contains('Home');
    cy.contains('Login');
    cy.contains('Register');
  });

  it('Logs the user in', () => {
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });

  it('Login page should render correctly', () => {
    cy.contains('Login');
    cy.contains('Email');
    cy.contains('Password');
    cy.get('#login-email')
      .type('test@test.com')
      .should('have.value', 'test@test.com');
    cy.get('#login-password')
      .type('test')
      .should('have value', 'test');
  });
});
