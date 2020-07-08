import React, { useEffect, useState } from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  const WithErrorHandler = props => {
    const [error, setError] = useState(null)

    const requestInterceptor = axios.interceptors.request.use(
      req => {
        setError(null)
        return req
      },
      err => {
        console.log('Error handler > request > error', err)
        setError(err)
      }
    )
    
    const responseInterceptor = axios.interceptors.response.use(
      res => res,
      err => {
        console.log('Error handler > response > error', err)
        setError(err)
      }
    )

    const errorConfirmedHandler = () => {
      setError(null)
    }

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor)
        axios.interceptors.response.eject(responseInterceptor)
      }
    }, [requestInterceptor, responseInterceptor])

    return (
      <>
        <Modal show={error} toggle={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    )
  }
  return WithErrorHandler
}
export default withErrorHandler
