function visitProfilePage() {
  cy.visit('http://localhost:8080')
  cy.contains('[data-testid="navbar-links"]:visible > a', 'My Profile').should('exist').click({
    scrollBehavior: false
  })
}

describe('Author profile visibility', () => {
  beforeAll(() => cy.login())

  it('Shows the author name and image with post previews', () => {
    cy.visit('http://localhost:8080')

    const authorContainer = cy
      .get('[dataset-testid="post-preview"]')
      .first()
      .contains('[data-testid="author-info"]')

    // Assert
    authorContainer.should('contain', '[data-testid="author-info-image"]')
    authorContainer.should('contain', '[data-testid="author-info-name"]')
  })

  it('Shows the author name and image in post pages', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-testid="post-preview"]').first().click()

    const authorContainer = cy
      .get('[data-testid="post"]')
      .contains('[data-testid="author-info-link"]')

    // Assert
    authorContainer.should('contain', '[data-testid="author-info-image"]')
    authorContainer.should('contain', '[data-testid="author-info-name"]')
  })
})

describe('Profile page functionality', () => {
  beforeAll(() => cy.login())

  it('Displays the authors stats and biography on their profile page', () => {
    visitProfilePage()

    const profilePage = cy.get('[data-testid="profile-page"]')

    // Assert
    profilePage.should('exist')
    profilePage.should('contain', '[data-testid="user-profile-heading"]')
    profilePage.should('contain', '[data-testid="user-stats"]')
    profilePage.should('contain', '[data-testid="user-blurb"]')
    profilePage.should('contain', '[data-testid="profile-links"]')
  })
})

export {}
