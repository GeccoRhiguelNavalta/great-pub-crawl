describe("log in successfully", () => {
  it("should navigate to the login page", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[type="email"]').type("bob@email.com");
    cy.get('input[type="password"]').type("test");
    cy.get("form").submit();
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
