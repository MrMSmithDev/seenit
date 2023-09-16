function visitProfilePage() {
  cy.visit('http://localhost:8080')
  cy.contains('[data-testid="navbar-links"]:visible > a', 'My Profile').should('exist').click({
    scrollBehavior: false
  })
}

function visitEditProfilePage() {
  cy.visit('http://localhost:8080')
  cy.contains('[data-testid="navbar-links"]:visible > a', 'My Profile').should('exist').click({
    scrollBehavior: false
  })
  cy.get('data-testid="edit-profile-link"').should('be.visible').click()
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

  beforeEach(() => visitProfilePage())

  it('Displays the authors stats and biography on their profile page', () => {
    const profilePage = cy.get('[data-testid="profile-page"]')

    // Assert
    profilePage.should('exist')
    profilePage.get('[data-testid="user-profile-heading"]').should('exist')
    profilePage.get('[data-testid="user-stats"]').should('exist')
    profilePage.get('[data-testid="user-blurb"]').should('exist')
    profilePage.get('[data-testid="profile-links"]').should('exist')
  })

  it('Links to the users posts', () => {
    cy.contains('a', 's Posts').should('exist').click()

    // Assert
    cy.url().should('include', '/users/')
    cy.url().should('include', 'posts')
    cy.get('[data-testid="feed-title"]').should('contain.text', 's Posts')
    cy.get('[data-testid="post-preview"]').should('exist')
  })

  it('Links to the users favorites', () => {
    cy.contains('a', 's Favorites').should('exist').click()

    // Assert
    cy.url().should('include', '/users/')
    cy.url().should('include', '/favorites')
    cy.get('[data-testid="feed-title"]').should('contain.text', 's Favorites')
    cy.get('[data-testid="post-preview"]').should('exist')
  })

  it('Links to the users comments', () => {
    cy.contains('a', 's Comments').should('exist').click()

    // Assert
    cy.url().should('include', '/users/')
    cy.url().should('include', '/comments')
    cy.get('[data-testid="feed-title"]').should('contain.text', 's Comments')
    cy.get('[data-testid="post-preview"]').should('exist')
    cy.get('[data-testid="comment"]').should('exist')
  })

  it('Links to edit the profile page', () => {
    visitProfilePage()

    cy.contains('a:visible', 'Edit Profile').should('be.visible').click()

    // Assert
    cy.url().should('include', '/edit-profile/')
    cy.get('[data-testid="edit-profile-page"]').should('exist')
  })

  after(() => cy.logout())
})

describe('Edit profile page functionality', () => {
  beforeAll(() => cy.login())

  it('allows a user to edit the blurb section of their profile', () => {
    visitEditProfilePage()

    const blurbInput = cy.get('data-testid="edit=profile-blurb-input"').should('exist')
    blurbInput.type('Edit profile blurb test')

    // Assert
    blurbInput.should('have.value', 'Edit profile blurb test')
  })

  it('allows a user to upload a new image file as a profile picture', () => {
    visitEditProfilePage()

    const fileInput = cy.get('[data-testid="edit-profile-image-input"]')

    // Assert
    fileInput.selectFile('cypress/fixtures/test.jpg')
    fileInput.should('have.value', 'cypress/fixtures/test.jpg')
  })

  it('updates the image preview to show the new uploaded image', () => {
    visitEditProfilePage()

    const originalPreview = cy.get('data-testid="edit-profile-image-preview"')
    cy.get('data-testid="edit-profile-image-input').selectFile('cypress/fixtures/test.jg')

    const newPreview = cy.get('data-testid="edit-profile-image-preview"')

    // assert
    originalPreview.should('not.equal', newPreview)
  })
})

export {}
