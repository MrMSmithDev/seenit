/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>
    visit(
      originalFn: CommandOriginalFn,
      url: string,
      options: Partial<VisitOptions>
    ): Chainable<Element>
  }
}
