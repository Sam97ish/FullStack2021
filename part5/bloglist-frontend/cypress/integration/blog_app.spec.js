
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'root',
      name: 'sam',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('root is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('secret00')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.visit('http://localhost:3000')
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      // ...
      cy.get('#create-blog').click()
      cy.get('#titleInput').type('cypress title')
      cy.get('#authorInput').type('cypress')
      cy.get('#urlInput').type('cypress.com')
      cy.get('#create-blog-button').click()

      cy.contains('cypress title')
    })
  })

  describe('Liking and Deleting a blog', function() {
    beforeEach(function() {
      // log in user here
      cy.visit('http://localhost:3000')
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      // create test blog
      cy.get('#create-blog').click()
      cy.get('#titleInput').type('cypress title')
      cy.get('#authorInput').type('cypress')
      cy.get('#urlInput').type('cypress.com')
      cy.get('#create-blog-button').click()
    })

    it('A blog can be Liked', function() {
      // ...
      cy.contains('cypress title')
        .get('#view-blog-button').click()
        .get('#like-blog-button').click()
      cy.get('#num-likes').contains('1')
    })

    it('A blog can be Deleted', function() {
      // ...
      cy.contains('cypress title')
        .get('#view-blog-button').click()
        .get('#delete-blog-button').click()
      cy.contains('cypress title').should('not.exist')
    })
  })

  describe('Blog order', function() {
    beforeEach(function() {
      // log in user here
      cy.request('POST', 'http://localhost:3003/api/login/', { username: 'root', password: 'secret' })
        .then((response) => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
          // create test blogs
          const blog1 = {
            title: 'test1',
            author: 'cy',
            likes: 100,
            url: 'cy.com',
          }
          const blog2 = {
            title: 'test2',
            author: 'cy',
            likes: 50,
            url: 'cy.com',
          }
          const blog3 = {
            title: 'test3',
            author: 'cy',
            likes: 0,
            url: 'cy.com',
          }
          cy.request({
            method:'POST',
            url:'http://localhost:3003/api/blogs/',
            body: blog1,
            headers: {
              Authorization: `bearer ${response.body.token}` },
          })
          cy.request({
            method:'POST',
            url:'http://localhost:3003/api/blogs/',
            body: blog2,
            headers: {
              Authorization: `bearer ${response.body.token}` },
          })
          cy.request({
            method:'POST',
            url:'http://localhost:3003/api/blogs/',
            body: blog3,
            headers: {
              Authorization: `bearer ${response.body.token}` },
          })
        })
    })

    it('Blogs are well ordered', function() {
      cy.visit('http://localhost:3000')
      cy.contains('root is logged in')
      cy.get('.blogs-to-check>.title-to-check').then(elements =>
      {
        return(
          expect(elements[0]).to.contain('test1')
        && expect(elements[1]).to.contain('test2')
        && expect(elements[2]).to.contain('test3'))
      })
    })
  })
})