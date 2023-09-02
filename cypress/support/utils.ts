export function getLoginButton() {
  if (cy.get('button[class="inBRJaZj8hKUECNDfHOD"]').should('exist')) {
    return cy.get('button[class="inBRJaZj8hKUECNDfHOD"]').click()
  }
}
