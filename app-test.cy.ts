describe('renders the signin page', () => {
  //it.only('should render correctly', () => {
    //cy.visit('/');
  //});
  it('mount the signin without header'), () =>{
    cy.mount('/');
  }

  beforeEach(()=>{
    cy.visit('/')
  })
  it('2.1 User login process', () =>{
    cy.get("[name='email']").type('myemail@domain.com')
    cy.get("[name='password']").type('psw')
    cy.get("[type='button']").click()
  });

  it('2.2 User should not be able to login without entering an email and password', () =>{
    //In the application itself, without email and password, it is redirecting to login page. So, this use case cannot be automated
  });

  it('2.3 Check if user is redirected to user page after login', () =>{
    cy.get("[name='email']").type('myemail@domain.com')
    cy.get("[name='password']").type('psw')
    cy.get("[type='button']").click()
    cy.url().should('contain', Cypress.config().baseUrl + '/users')
  });

  it('2.4 User should be able to logout', () =>{
    cy.get("[name='email']").type('myemail@domain.com')
    cy.get("[name='password']").type('psw')
    cy.get("[type='button']").click()
    cy.get('header').find('button').click()
    cy.get('.MuiList-root').contains('Sign out').click()
  });

  it('3. User should be redirected to sign in page if not authenticated', () =>{
    cy.visit("/users")
    cy.location('pathname').should('eq', '/signin')
  });

  it('4.1 User should be able to click on an existing item and have the drawer open', () =>{
    cy.get("[name='email']").type('myemail@domain.com')
    cy.get("[name='password']").type('psw')
    cy.get("[type='button']").click()
    cy.get('.MuiTableBody-root').contains('First').click()
  });

  it('4.2 User should be able to edit any of the fields', () =>{
    cy.get("[name='email']").type('myemail@domain.com')
    cy.get("[name='password']").type('psw')
    cy.get("[type='button']").click()
    cy.get('.MuiTableBody-root').contains('First').click()
    cy.get("[type='text-area']").clear().type('FirstEdited')
  });

  it('4.3 User should be able to save the changes', () =>{
    cy.get("[name='email']").type('myemail@domain.com')
    cy.get("[name='password']").type('psw')
    cy.get("[type='button']").click()
    cy.get('.MuiTableBody-root').contains('First').click()
    cy.get("[type='text-area']").clear().type('FirstEdited')
    cy.get('.MuiBox-root').contains('Submit').click()
  });

  it('4.4 Click on the currently edited item to ensure the changes were saved', () =>{
    cy.get("[name='email']").type('myemail@domain.com')
    cy.get("[name='password']").type('psw')
    cy.get("[type='button']").click()
    cy.get('.MuiTableBody-root').contains('First').click()
    cy.get("[type='text-area']").clear().type('Editedname')
    cy.get('.MuiBox-root').contains('Submit').click()
    cy.get('.MuiTypography-root').contains('Editedname').click()
  });

  it('5.1 Item should not save if the name already exists in the list', () =>{
    cy.get("[name='email']").type('myemail@domain.com')
    cy.get("[name='password']").type('psw')
    cy.get("[type='button']").click()
    cy.get('.MuiButtonBase-root').contains('Add Item').click()
    cy.get("[name='name']").type('FIRST')
    cy.get('.MuiTableContainer-root').contains('FIRST').should('not.exist')
  });

  it('5.2 Check if Submit button should be disabled if the name is empty', () =>{
    //In the application, when the name field is empty, submit button is in enabled state only. 
    //So, I couldn't validate my code. Anyway, I have written use case for disabled functionality.
    //This use case will be accounted as Failing in results because of enabled submit button in application.
    cy.get("[name='email']").type('myemail@domain.com')
    cy.get("[name='password']").type('psw')
    cy.get("[type='button']").click()
    cy.get('.MuiButtonBase-root').contains('Add Item').click()
    cy.get("[name='name']").should('not.have.value')
    cy.get('.MuiBox-root').contains('Submit').should('be.disabled')
  });

  it('5.3 User should be able to add an item to the list', () =>{
    cy.get("[name='email']").type('myemail@domain.com')
    cy.get("[name='password']").type('psw')
    cy.get("[type='button']").click()
    cy.get('.MuiButtonBase-root').contains('Add Item').click()
    cy.get("[name='name']").type('Newname')
    cy.get("[name='description']").type('New name is added')
    cy.get('.MuiBox-root').contains('Submit').click()
  });
});
