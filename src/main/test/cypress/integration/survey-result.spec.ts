import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
const mockUnexpectedError = (): void => { Http.mockServerError(path, 'GET') }
const mockAccessDeniedError = (): void => { Http.mockForbiddenError(path, 'GET') }
const mockSuccess = (): void => { Http.mockOk(path, 'GET', 'fx:survey-result') }

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('Should be able to present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })

  it('Should be able to reload on button click', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.getByTestId('question').should('exist')
  })

  it('Should be able to logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })
})
