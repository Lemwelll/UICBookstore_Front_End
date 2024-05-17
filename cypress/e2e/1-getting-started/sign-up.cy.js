describe('Signup Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-up') // Replace with your actual signup page URL
  })

  it('Positive: Create account button is clickable when all required fields are filled', () => {
    cy.get('input[name="input-10-2"]').type('password123') // Fill password field
    cy.get('input[label="validEmail"]').type('test@example.com') // Fill email field
    cy.get('input[label="ID Number/Student ID"]').type('123456789') // Fill ID field
    cy.get('input[type="checkbox"]').check() // Check the checkbox for receiving emails
    cy.get('button[type="submit"]').should('not.be.disabled') // Assert that the button is clickable
  })

  it('Positive: Successful form submission redirects user to index page', () => {
    cy.get('input[name="input-10-2"]').type('password123') // Fill password field
    cy.get('input[label="Email Address"]').type('test@example.com') // Fill email field
    cy.get('input[label="ID Number/Student ID"]').type('123456789') // Fill ID field
    cy.get('input[type="checkbox"]').check() // Check the checkbox for receiving emails
    cy.get('button[type="submit"]').click() // Submit the form
    cy.url().should('include', '/index') // Assert that user is redirected to index page
  })

  it('Negative: Create account button is disabled when any required field is left empty', () => {
    // Do not fill any fields
    cy.get('button[type="submit"]').should('be.disabled') // Assert that the button is disabled
  })

  it('Negative: Invalid form submission does not redirect user to index page', () => {
    cy.get('input[name="input-10-2"]').type('password123') // Fill password field
    cy.get('input[label="Email Address"]').type('invalidemail') // Fill email field with invalid email
    cy.get('input[label="ID Number/Student ID"]').type('123456789') // Fill ID field
    cy.get('input[type="checkbox"]').check() // Check the checkbox for receiving emails
    cy.get('button[type="submit"]').click() // Submit the form
    cy.url().should('not.include', '/index') // Assert that user is not redirected to index page
  })
})
