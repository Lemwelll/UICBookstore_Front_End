describe('Login Page', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:8000/login');
  });

  it('allows user to sign in with valid credentials', () => {
    // Fill in email and password fields with valid credentials
    cy.get('input[name="input-10-2"]').type('valid_username');
    cy.get('input[name="input-10-2"]').type('valid_password');

    // Submit the form
    cy.get('form').submit();

    // Check if redirected to the home page
    cy.url().should('include', 'http://localhost:8000/home');
  });

  it('displays error messages for invalid credentials', () => {
    // Fill in email and password fields with invalid credentials
    cy.get('input[name="input-10-2"]').type('invalid_username');
    cy.get('input[name="input-10-2"]').type('invalid_password');

    // Submit the form
    cy.get('form').submit();

    // Check for authentication failure message
   // cy.contains('Authentication failure').should('exist');
  });

  it('displays error messages for empty fields', () => {
    // Submit the form without filling in any fields
    cy.get('form').submit();

    // Check for error messages
    cy.contains('Required').should('exist');
  });

  it('redirects to sign up page when clicked on sign up link', () => {
    // Click on the sign up link
    cy.contains('Sign Up').click();

    // Check if redirected to the sign up page
    cy.url().should('include', 'http://localhost:8000/sign-up');
  });

  it('redirects to forgot password page when clicked on forgot password link', () => {
    // Click on the forgot password link
    cy.contains('Forgot your password').click();

    // Check if redirected to the forgot password page
    cy.url().should('include', 'http://localhost:8000/forgot-password');
  });
});
