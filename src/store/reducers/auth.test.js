import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'
import { initPurchase } from '../actions'

describe('auth reducer', () => {
  let wrapper
  beforeEach(() => {
    wrapper = {
      token: null,
      userId: null,
      error: null,
      isLoading: false,
      redirectPathOnLogin: '/',
    }
  })
  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual(wrapper)
  })
  it('should store token/userId upon login', () => {
    expect(
      reducer(wrapper, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'test-token',
        userId: 'test-userId',
      })
    ).toEqual({
      token: 'test-token',
      userId: 'test-userId',
      error: null,
      isLoading: false,
      redirectPathOnLogin: '/',
    })
  })
})
