describe('Displays comments correctly', () => {
  beforeAll(() => {
    cy.login()
  })

  it('correctly displays comments on posts which include at least one comment', () => {
    cy.visit('http://localhost:8080')

    cy.get('[data-testid="comment-count"]').contains('1').first().should('exist').click()

    // Assert
    const comment = cy.get('[data-testid="comment"]')

    comment.get('[data-testid="author-info-link"]').should('exist')
    comment.get('[data-testid="comment-score-container"]').should('exist')
    comment.get('[data-testid="comment-body"]').should('exist')
  })

  it('displays a no comments message when no comments are made', () => {
    cy.visit('http://localhost:8080')

    cy.get('[data-testid="comment-count"]').contains('0').first().should('exist').click()

    // Assert
    cy.contains('No comments have been made').should('exist')
  })
})

export {}
