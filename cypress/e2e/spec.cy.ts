describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  it('inital pass', () => {
    cy.contains('Create Todo').should('be.visible')
    cy.get('#new-todo-text').should('be.visible')
	cy.get('.todo').should('have.length', 1)
	cy.get('input[type=checkbox]').should('not.be.checked')
  })
  it('should add new todo', () => {
    cy.contains('Create Todo').should('be.visible')
    cy.get('#new-todo-text').should('be.visible')
	cy.get('.todo').should('have.length', 1)
	cy.get('#new-todo-text').type('hello world')
    cy.contains('Create Todo').should('be.visible').click()
	cy.get('.todo').should('have.length', 2)
    cy.contains('hello world').should('be.visible')
  })
  it('should remove new todo', () => {
    cy.contains('Create Todo').should('be.visible')
    cy.get('#new-todo-text').should('be.visible')
	cy.get('.todo').should('have.length', 1)
    cy.contains('delete').should('be.visible').click()
	cy.get('.todo').should('have.length', 0)
  })
  it('mark todo as done', () => {
    cy.contains('done').should('be.visible').click()
    cy.get('[id*=done-button]').should('be.enabled')
  })
})
