describe('Visits a post link', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('http://localhost:8080')
  })

  it('Shows a post with a valid structure when given a valid address', () => {
    
  })

  it('Visits a post page when a valid link is clicked from "Home"', () => {
    // Act
    cy.visit('http://localhost:8080/')
    cy.get('[data-testid="post-preview"]').first().click()

    // Assert
    cy.get('[data-testid="post"]').should('exist')
  })

  it('Visits a post page when a valid link is clicked from "My Posts"', () => {
    // Act
    cy.visit('http://localhost:8080/')
    cy.get('[data-testid="post-preview"]').first().click()

    // Assert
    cy.get('[data-testid="post"]').should('exist')
  })
})

export {}
