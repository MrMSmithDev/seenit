describe('Displays comments correctly', () => {
  beforeAll(() => {
    cy.login()
  })

  it('correctly displays comments on posts which include at least one comment', () => {
    cy.visit('http://localhost:8080')

    cy.get('[data-testid="comment-count"]').contains('1').first().should('be.visible').click()

    // Assert
    const comment = cy.get('[data-testid="comment"]')

    comment.should('exist')
    comment.get('[data-testid="author-info-link"]').should('exist')
    comment.get('[data-testid="comment-score-container"]').should('exist')
    comment.get('[data-testid="comment-body"]').should('exist')
  })

  it('displays a no comments message when no comments are made', () => {
    cy.visit('http://localhost:8080')

    cy.get('[data-testid="comment-count"]').contains('0').first().should('be.visible').click()

    // Assert
    cy.contains('No comments have been made').should('exist')
  })

  it('Shows a new comment form on all posts', () => {
    cy.visit('http://localhost:8080')

    cy.get('data-testid="post-preview"').first().should('be.visible').click()

    // Assert
    const commentForm = cy.get('[data-testid="new-comment-form"]')
    commentForm.should('exist')
    commentForm.get('new-comment-input').should('exist')
    commentForm.get('new-comment-publish-btn')
  })
})

describe('handles new comment form behavior correctly', () => {
  it('allows input in the new comment form', () => {
    cy.visit('http://localhost:8080')

    cy.get('data-testid="post-preview"').first().should('be.visible').click()
    const commentInput = cy.get('data-testid="new-comment-input"')
    commentInput.should('exist').type('Comment test')

    // Assert
    commentInput.should('have.value', 'Comment test')
  })

  it('shows an active publish button when commentBody.length is greater than zero', () => {
    cy.visit('http://localhost:8080')

    cy.get('data-testid="post-preview"').first().should('be.visible').click()
    cy.get('data-testid="comment-form-input"').should('exist').type('Activate publish button')

    // Assert
    cy.get('new-comment-publish-btn').should('not.be.disabled')
  })

  it('shows a disabled publish button when commentBody.length is less than zero', () => {
    cy.visit('http://localhost:8080')

    cy.get('data-testid="post-preview"').first().should('be.visible').click()
    cy.get('data-testid="comment-form-input"').should('have.value', '')

    // Assert
    cy.get('new-comment-publish-btn').should('be.disabled')
  })
})

export {}
