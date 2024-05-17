describe('Store Page', () => {
    beforeEach(() => {
      // Visit the store page before each test
      cy.visit('http://localhost:8000/store');
    });
    it('displays confirmation message for successful reservation', () => {
      // Write test steps to verify successful reservation confirmation message
      // For example:
      // Reserve an item with valid reservation details
      // Verify that a confirmation message is displayed
    });
  
    it('displays error message for overlapping reservations', () => {
      // Write test steps to verify error message for overlapping reservations
      // For example:
      // Attempt to reserve an item with conflicting reservation details
      // Verify that an error message indicating reservation conflict is displayed
    });
  
    it('displays error message for invalid input', () => {
      // Write test steps to verify error message for invalid input
      // For example:
      // Attempt to reserve an item with missing required fields or invalid data
      // Verify that an error message indicating reservation input is displayed
    });
  });
  