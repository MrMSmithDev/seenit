function visitProfilePage() {
  cy.visit('http://localhost:8080')
  cy.contains('[data-testid="navbar-links"]:visible > a', 'My Profile').should('exist').click({
    scrollBehavior: false
  })
}

describe('Author profile visibility', () => {
  before(() => cy.login())

  it('Shows the author name and image with post previews', () => {
    cy.visit('http://localhost:8080')

    const authorContainer = cy
      .get('[data-testid="post-preview"]')
      .first()
      .get('[data-testid="author-info"]')

    // Assert
    authorContainer.get('[data-testid="author-info-image"]').should('exist')
    authorContainer.get('[data-testid="author-info-name"]').should('exist')
  })

  it('Shows the author name and image in post pages', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-testid="post-preview"]').first().click()

    const authorContainer = cy
      .get('[data-testid="post"]')
      .first()
      .get('[data-testid="author-info-link"]')

    // Assert
    authorContainer.get('[data-testid="author-info-image"]').should('exist')
    authorContainer.get('[data-testid="author-info-name"]').should('exist')
  })

  after(() => cy.logout())
})

describe('Profile page functionality', () => {
  before(() => cy.login())

  it('Displays the authors stats and biography on their profile page', () => {
    visitProfilePage()

    const profilePage = cy.get('[data-testid="profile-page"]')

    // Assert
    profilePage.should('exist')
    profilePage.get('[data-testid="user-profile-heading"]').should('exist')
    profilePage.get('[data-testid="user-stats"]').should('exist')
    profilePage.get('[data-testid="user-blurb"]').should('exist')
    profilePage.get('[data-testid="profile-links"]').should('exist')
  })

  after(() => cy.logout())
})

export {}
