describe('loads login page on initial visit', () => {
  it('Opens login on non-auth page opening', () => {
    cy.visit('http://localhost:8080/')

    cy.contains('Sign in with Google').should('exist')
  })
})

export {}
