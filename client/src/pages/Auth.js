import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const [isLogInMode, setIsLogInMode] = useState(true);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isLogInMode) {
        const { data } = await axios.post('/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        console.log(data);
      } else {
        const { data } = await axios.post('/api/users/register', formData);
        console.log(data);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  };

  return (
    <div className='min-h-screen bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-6 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <Link className='inline-block' to='/'>
              <img
                className='h-12 w-auto'
                src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                alt='Workflow'
              />
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
                    Sign in
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

export default Auth;
