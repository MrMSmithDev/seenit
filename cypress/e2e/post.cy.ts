function visitPost() {
  cy.visit('http://localhost:8080')
  cy.get('[data-testid="post-preview"]').first().click()
}

describe('Visits a post link', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Shows a post with a valid structure when given a valid address', () => {
    // Act
    visitPost()

    // Assert valid post structure
    cy.get('[data-testid="post-title"]').should('exist')
    cy.get('[data-testid="post-body"]').should('exist')
    cy.get('[data-testid="post-info"]').should('exist')
    cy.get('[data-testid="author-info-link"]').should('exist')
  })

  it('Visits a post page when a valid link is clicked from "Home"', () => {
    // Act
    visitPost()

    // Assert Post Exists
    cy.get('[data-testid="post"]').should('exist')
  })

  it('Visits a post page when a valid link is clicked from "My Posts"', () => {
    // Act
    cy.visit('http://localhost:8080/')
    cy.contains('[data-testid="navbar-links"]:visible > a', 'My Posts').click({
      scrollBehavior: false
    })
    cy.url().should('include', '/users/')
    cy.url().should('include', '/posts')
    cy.get('[data-testid="post-preview"]').first().click()

    // Assert
    cy.get('[data-testid="post"]').should('exist')
  })

  it('Visits a post page when a valid link is clicked from "My favorites"', () => {
    // Act
    cy.visit('http://localhost:8080/')
    cy.contains('[data-testid="navbar-links"]:visible > a', 'My Favorites').click({
      scrollBehavior: false
    })
    cy.url().should('include', '/users/')
    cy.url().should('include', '/favorites')
    cy.get('[data-testid="post-preview"]').first().click()

    // Assert
    cy.get('[data-testid="post"]').should('exist')
  })
})

describe('Creates valid links', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Creates a valid link to an authors profile page', () => {
    // Act
    visitPost()
    cy.get('[data-testid="author-info-link"]').click()

    // Assert
    cy.url().should('include', '/users/profile/')
  })
})

export {}
