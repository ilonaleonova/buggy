const HOME = 'https://buggy.justtestit.org'
const PASSWORD = 'Password1234!'

describe('Buggy Cars Website works without logging in', () => {
    it('Loads the home page', () => {
        cy.visit(HOME)
    
        cy.contains('Buggy Rating')
        cy.contains('Popular Make')
        cy.contains('Popular Model')
        cy.contains('Overall Rating')
    
        cy.contains(`© ${new Date().getFullYear()}`)
    })

    it('Has registration page', () => {
        cy.visit(HOME)

        cy.contains('Register').click()

        cy.contains('Login')
        cy.contains('First Name')
        cy.contains('Last Name')
        cy.contains('Password')
        cy.contains('Confirm Password')
        
        cy.get('main form button[type=submit]').should('be.disabled')
        cy.contains('Cancel').should('have.attr', 'href').and('equals', '/')
    })
})

describe('Buggy Cars Website works for authenticated users', () => {
    beforeEach(() => {
        cy.visit(HOME)
        cy.contains('Register').click()

        const username = `TestUser${new Date().getTime()}`
        cy.wrap(username).as('username')

        cy.get('#username').type(username)
        cy.get('#firstName').type(username)
        cy.get('#lastName').type('Last')
        cy.get('#password').type(PASSWORD)
        cy.get('#confirmPassword').type(PASSWORD)

        cy.get('main form button[type=submit]').click()

        cy.contains('Registration is successful')

        cy.get('header form input[name=login]').type(username)
        cy.get('header form input[name=password]').type(PASSWORD)
        cy.get('header form button[type=submit]').click()

        cy.contains(`Hi, ${username}`)
    })

    it('Can view and edit profile', function () {
        cy.contains('Profile').click()

        cy.contains('Basic')
        cy.contains('Additional Info')

        cy.get('#lastName').clear().type(this.username)
        cy.get('main form button[type=submit]').click()

        cy.visit(HOME)
        cy.contains('Profile').click()
        cy.get('#lastName').should('have.value', this.username)
    })

    it('Can vote', function () {
        cy.visit(`${HOME}/overall`)

        cy.get('table.cars tbody tr .thumbnail a').first().click()
        cy.contains('Votes: ').find('strong').then(function($el) {
            const currentVotes = parseInt($el.text())
            cy.get('main button.btn-success').click()
            cy.contains('Thank you for your vote')

            cy.contains('Votes: ').find('strong').then(function($el) {
                const updatedVotes = parseInt($el.text())
                expect(updatedVotes).to.be.greaterThan(currentVotes)
            })
        })
    })

    it('Can navigate between the pages', function () {
        cy.visit(`${HOME}/overall`)

        cy.contains('page 1 of')
        cy.get('my-pager input').clear().type('2{enter}')
        cy.contains('page 2 of')
        cy.get('my-pager a').contains('»').click()
        cy.contains('page 3 of')
    })
})