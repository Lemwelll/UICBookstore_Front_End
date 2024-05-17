// cypress/integration/bookstore_reservation_spec.js

describe('Bookstore Reservation System', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/cart') // Assuming your Vue app is served at the root URL
    })
    it('should not display total payment when cart is empty', () => {
        cy.get('.v-footer__content .text-h6').should('not.exist');  // Uses negative assertion
      });
  
    it('should display cart badge with number of items', () => {
        cy.get('.v-badge__badge').should('be.visible');
        // Modify this line to match your expected behavior
        // You can use cy.get('.v-badge__badge').should('have.text', '2');  if you expect 2 items
      });
    
    it('should navigate to cart page when clicking on the cart icon', () => {
      cy.get('.mdi-cart-outline').click()
      cy.url().should('include', 'http://localhost:8000/cart')
    })
  
    it('should navigate to account page when clicking on the account icon', () => {
      cy.get('.mdi-account').click()
      cy.url().should('include', 'http://localhost:8000/account')
    })
    })
  