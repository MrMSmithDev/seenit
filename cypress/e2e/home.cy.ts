describe('loads login page on initial visit', () => {
  it('Opens login on non-auth page opening', () => {
    // Act
    cy.visit('http://localhost:8080/')

    // Assert
    cy.contains('Sign in with Google').should('exist')
  })
})

describe('logs in with an authorized Google login', () => {
  beforeEach(() => cy.login())

  it('Logs in when provided with authorized credentials and loads home post previews', () => {
    // Act
    cy.visit('http://localhost:8080/')

    // Assert
    cy.get('[data-testid="feed-title"]').should('have.text', 'Home')
    cy.get('[data-testid="post-preview"]').should('exist')
  })

  it('Logs in and shows the navbar and header', () => {
    // Act
    cy.visit('http://localhost:8080/')

    // Assert
    cy.get('[data-testid="header"]').should('exist')
    cy.get('[data-testid="navbar"]').should('exist')
  })

  it('Changes the filter when selected', () => {
    // Act
    cy.visit('http://localhost:8080/')
    cy.get('[data-testid="filter-toggle"]').click()
    cy.contains('button', 'Oldest').click({ scrollBehavior: false })

    // Assert
    cy.get('[data-testid="filter-toggle"]').should('have.text', 'Oldest ')

    // Include logic to check first post has changed
  })
})

export {}
