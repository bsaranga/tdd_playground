describe('Task prerequisites', () => {
  it('Task form is present', () => {
    cy.visit('http://localhost:3000')
    cy.get('#taskInputForm').should('exist')

    cy.get('#taskInputForm label[for="title"]').should('exist').and('have.text', 'Title')
    cy.get('#taskInputForm input[name="title"]').should('exist')

    cy.get('#taskInputForm label[for="description"]').should('exist').and('have.text', 'Description')
    cy.get('#taskInputForm input[name="description"]').should('exist')

    cy.get('#taskInputForm label[for="dueDate"]').should('exist').and('have.text', 'Due Date')
    cy.get('#taskInputForm input[name="dueDate"]').should('exist')

    cy.get('#taskInputForm label[for="time"]').should('exist').and('have.text', 'Time')
    cy.get('#taskInputForm input[name="time"]').should('exist')

    cy.get('#taskInputForm label[for="priority"]').should('exist').and('have.text', 'Priority')
    cy.get('#taskInputForm select[name="priority"]').should('exist')

    cy.get('#taskInputForm button[type="submit"]').should('exist').and('have.text', 'Add Task')
  });

  it('Task list is present', () => {
    cy.visit('http://localhost:3000')
    cy.get('#taskList').should('exist')
    cy.get('#taskList').children().should('have.length', 0);
  });
});

describe('Task creation', () => {
  it('Task is created', () => {
    cy.visit('http://localhost:3000')
    cy.get('#taskInputForm input[name="title"]').type('Task 1')
    cy.get('#taskInputForm input[name="description"]').type('Task 1 description')
    cy.get('#taskInputForm input[name="dueDate"]').type('2021-12-31')
    cy.get('#taskInputForm input[name="time"]').type('12:00')
    cy.get('#taskInputForm select[name="priority"]').select('High')

    cy.get('#taskInputForm button[type="submit"]').click()

    cy.get('#taskList').children().should('have.length', 1);
    cy.get('#taskList').children().first().children().should('have.length', 4);
    cy.get('#taskList').children().first().children().eq(0).should('have.text', 'Task 1');
    cy.get('#taskList').children().first().children().eq(1).should('have.text', 'Task 1 description');
    cy.get('#taskList').children().first().children().eq(2).should('have.text', 'Fri Dec 31 2021 at 12:00 AM');
    cy.get('#taskList').children().first().children().eq(3).should('have.text', 'High');
  });
});