import React, {useEffect, useState} from 'react';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  const WithErrorHandler = props => {
    const [error, setError] = useState(null);
    const requestInterceptor = axios.interceptors.request.use(
      req => {
        setError(null);
        return req;
      },
      errorParameter => {
        console.log(
          'Error handler > request > error',
          errorParameter
        );
        setError(errorParameter);
        return Promise.reject(errorParameter);
      }
    );
    const responseInterceptor = axios.interceptors.response.use(
      res => res,
      errorParameter => {
        console.log(
          'Error handler > response > error',
          errorParameter
        );
        setError(errorParameter);
        return Promise.reject('Request failed. Status code 404');
      }
    );
    useEffect(
      () => {
        return () => {
          axios.interceptors.request.eject(requestInterceptor);
          axios.interceptors.response.eject(responseInterceptor);
        };
      },
      [requestInterceptor, responseInterceptor]
    );
    return <>
      <Modal 
        show={error !== null}
        toggle={() => setError(null)}
      >
        {error !== null && error}
      </Modal>
      <WrappedComponent {...props}/>
    </>
  };
  return WithErrorHandler;
};
export default withErrorHandler;
