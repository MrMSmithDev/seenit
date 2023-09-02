describe('loads login page on initial visit', () => {
  it('Opens login on non-auth page opening', () => {
    cy.visit('http://localhost:8080/')

    cy.contains('Sign in with Google').should('exist')
  })
})

describe('logs in with an authorized Google login', () => {
  before(() => cy.login()) // 'xGgyc4VGyUbbCxaWj88a5UCXfNk2'

  it('Logs in when provided with authorized credentials', () => {
    cy.visit('http://localhost:8080')
  })
})

export {}
