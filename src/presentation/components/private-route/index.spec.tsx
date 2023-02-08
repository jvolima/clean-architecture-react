import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { PrivateRoute } from '.'

describe('PrivateRoute', () => {
  it('Should be able to redirect to /login if token is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
      <Router history={history}>
        <PrivateRoute />
      </Router>
    )
    expect(history.location.pathname).toBe('/login')
  })
})
