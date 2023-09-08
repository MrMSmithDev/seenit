const homepage = 'http://localhost:8080'

describe('loads login page on initial visit', () => {
  it('Opens login on non-auth page opening', () => {
    // Act
    cy.visit(homepage)

    // Assert
    cy.contains('Sign in with Google').should('exist')
  })
})

describe('logs in with an authorized Google login', () => {
  beforeEach(() => cy.login())

  it('Logs in when provided with authorized credentials and loads home post previews', () => {
    // Act
    cy.visit(homepage)

    // Assert
    cy.get('[data-testid="feed-title"]').should('have.text', 'Home')
    cy.get('[data-testid="post-preview"]').should('exist')
  })

  it('Logs in and shows the navbar and header', () => {
    // Act
    cy.visit(homepage)

    // Assert
    cy.get('[data-testid="header"]').should('exist')
    cy.get('[data-testid="navbar"]').should('exist')
  })

  it('Changes the filter when selected', () => {
    // Act
    cy.visit(homepage)

    const initialPostPreview = cy.get('[data-testid="post-preview"]').first()
    cy.get('[data-testid="filter-toggle"]').should('exist').click()
    cy.contains('button', 'Oldest').click({ scrollBehavior: false })

    // Assert
    cy.get('[data-testid="filter-toggle"]').should('have.text', 'Oldest ')
    cy.get('[data-testid="post-preview"]').first().should('not.equal', initialPostPreview)
  })

  it('Allows the user to log out', () => {
    // Act
    cy.visit(homepage)

    cy.get('[data-testid="user-status"]').should('exist').click()
    cy.contains('Sign Out').should('be.visible').click()

    // Assert
    cy.contains('Sign in with Google').should('exist')
  })
})

export {}
