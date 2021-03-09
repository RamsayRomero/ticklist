import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, login } from '../redux/actions/auth';
import HashLoader from 'react-spinners/HashLoader';
import ErrorModal from '../components/ErrorModal';
import logo from '../img/logo-black.png';

const Auth = (props) => {
  const [isLogInMode, setIsLogInMode] = useState(true);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  useEffect(() => {
    if (props.errors) {
      setErrorModalIsOpen(true);
    } else {
      setErrorModalIsOpen(false);
    }
  }, [props.errors]);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (isLogInMode) {
      props.login(formData.email, formData.password);
    } else {
      props.register(formData);
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='min-h-screen bg-white flex'>
      <ErrorModal
        isOpen={errorModalIsOpen}
        onClose={() => setErrorModalIsOpen(false)}
        errorMessage={props.errors && props.errors[0].msg}
      />
      <div className='flex-1 flex flex-col justify-center py-6 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <Link className='inline-block' to='/'>
              <img className='h-20 w-auto' src={logo} alt='Ticklist logo' />
            </Link>
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              {isLogInMode
                ? 'Log in to your account'
                : 'Sign up to start logging your ascents'}
            </h2>
            <p className='mt-2 text-sm text-gray-600 max-w'>
              {isLogInMode ? "Don't have an account? " : 'Have an account? '}
              <button
                onClick={() => setIsLogInMode(!isLogInMode)}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                {isLogInMode ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
          <div className='mt-8'>
            <div className='mt-6'>
              <form onSubmit={formSubmitHandler} className='space-y-6'>
                {!isLogInMode && (
                  <>
                    <div>
                      <label
                        htmlFor='firstname'
                        className='block text-sm font-medium text-gray-700'
                      >
                        First name
                      </label>
                      <div className='mt-1'>
                        <input
                          id='firstname'
                          name='firstname'
                          type='text'
                          autoComplete='given-name'
                          required
                          value={formData.firstName}
                          onChange={onInputChange}
                          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor='lastname'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Last name
                      </label>
                      <div className='mt-1'>
                        <input
                          id='lastname'
                          name='lastname'
                          type='text'
                          autoComplete='family-name'
                          required
                          value={formData.lastName}
                          onChange={onInputChange}
                          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email address
                  </label>
                  <div className='mt-1'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      required
                      value={formData.email}
                      onChange={onInputChange}
                      className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>
                <div className='space-y-1'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Password
                  </label>
                  <div className='mt-1'>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      onChange={onInputChange}
                      value={formData.password}
                      minLength='6'
                      className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>
                <div>
                  <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    {props.loading ? (
                      <HashLoader
                        loading={props.loading}
                        color='white'
                        size={20}
                      />
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src='https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8&auto=format&fit=crop&w=800&q=60'
          alt=''
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { register, login })(Auth);
