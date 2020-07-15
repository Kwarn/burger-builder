import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initalState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
  redirectPathOnLogin: '/',
}

export const setRedirectPathOnLogin = (state, action) => {
  return updateObject(state, {
    redirectPathOnLogin: action.path,
  })
}

export const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    userId: null,
  })
}

const authStart = (state) => {
  return updateObject(state, { error: null, isLoading: true })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    isLoading: false,
  })
}

const authFailed = (state, action) => {
  return updateObject(state, { error: action.error, isLoading: false })
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action)
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action)
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action)
    case actionTypes.SET_REDIRECT_PATH_ON_LOGIN:
      return setRedirectPathOnLogin(state, action)
    default:
      return state
  }
}

export default reducer
