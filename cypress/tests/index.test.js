context('VirtuaList', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.viewport(1280, 800)
  })

  context('Demo/Simple', () => {
    it('should render only viewable items in DOM', () => {
      cy.get('[data-test=actors]>*').should('have.length', 12)
    })
  })

  context('Demo/Complex', () => {
    it('should render only viewable items in DOM', () => {
      cy.scrollTo('bottom')
      cy.get('[data-test=youtube]>*').should('have.length', 45)
      cy.get('[data-test=youtube]>*').each(($el, i) => expect($el).to.have.attr('data-test', `${99955 + i}`))
      cy.get('[data-test=youtube]>*').each($el => expect($el).to.contain('Fetching...'))
    })
  })
})
