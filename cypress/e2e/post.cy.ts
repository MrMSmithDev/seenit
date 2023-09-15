function visitPost() {
  cy.visit('http://localhost:8080')
  cy.get('[data-testid="post-preview"]').should('be.visible').first().click()
}

describe('Visits a post link', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Shows a post with a valid structure when given a valid address', () => {
    visitPost()

    // Assert valid post structure
    cy.get('[data-testid="post-title"]').should('exist')
    cy.get('[data-testid="post-body"]').should('exist')
    cy.get('[data-testid="post-info"]').should('exist')
    cy.get('[data-testid="author-info-link"]').should('exist')
  })

  it('Visits a post page when a valid link is clicked from "Home"', () => {
    visitPost()

    // Assert Post Exists
    cy.get('[data-testid="post"]').should('exist')
  })

  it('Visits a post page when a valid link is clicked from "My Posts"', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('[data-testid="navbar-links"]:visible > a', 'My Posts').should('exist').click({
      scrollBehavior: false
    })
    cy.url().should('include', '/users/')
    cy.url().should('include', '/posts')
    cy.get('[data-testid="post-preview"]').first().should('be.visible').click()

    // Assert
    cy.get('[data-testid="post"]').should('exist')
  })

  it('Visits a post page when a valid link is clicked from "My favorites"', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('[data-testid="navbar-links"]:visible > a', 'My Favorites').should('exist').click({
      scrollBehavior: false
    })
    cy.url().should('include', '/users/')
    cy.url().should('include', '/favorites')
    cy.get('[data-testid="post-preview"]').first().should('be.visible').click()

    // Assert
    cy.get('[data-testid="post"]').should('exist')
  })
})

describe('Creates valid links', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Creates a valid link to an authors profile page', () => {
    visitPost()
    cy.get('[data-testid="author-info-link"]').should('be.visible').click()

    // Assert
    cy.url().should('include', '/users/profile/')
  })
})

export {}
