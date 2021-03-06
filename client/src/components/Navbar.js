import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Transition } from '@headlessui/react';
import { logout } from '../redux/actions/auth';
import logo from '../img/logo-white.png';
import Avatar from './Avatar';

const Navbar = ({ isAuthenticated, logout, user }) => {
  const [profileDropdownIsOpen, setProfileDropdownIsOpen] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <nav className='bg-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='-ml-2 mr-2 flex items-center md:hidden'>
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
                type='button'
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className={`${mobileMenuIsOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
                {/* Icon when menu is open */}
                <svg
                  className={`${mobileMenuIsOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <Link to='/' className='flex-shrink-0 flex items-center'>
              <img className='h-16 w-auto' src={logo} alt='Ticklist logo' />
              <div className='hidden lg:block -ml-2 text-white text-xl tracking-widest'>
                Ticklist
              </div>
            </Link>
            <div className='hidden md:ml-6 md:flex md:items-center md:space-x-4'>
              {isAuthenticated && (
                <NavLink
                  to='/dashboard'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                to='/users'
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              >
                Users
              </NavLink>
              <NavLink
                to='/areas'
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              >
                All Areas
              </NavLink>
              {isAuthenticated && (
                <NavLink
                  to='/myareas'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                >
                  My Areas
                </NavLink>
              )}
              {!isAuthenticated && (
                <NavLink
                  to='/auth'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                >
                  Log in
                </NavLink>
              )}
            </div>
          </div>
          {isAuthenticated && (
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <button
                  type='button'
                  className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500'
                >
                  <svg
                    className='-ml-1 mr-2 h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span>Log Ascent</span>
                </button>
              </div>
              <div className='hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center'>
                <button className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                  <span className='sr-only'>View notifications</span>
                  <svg
                    className='h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    />
                  </svg>
                </button>

                {/* Profile dropdown */}
                <div className='ml-3 relative'>
                  <div>
                    <button
                      onClick={() =>
                        setProfileDropdownIsOpen(!profileDropdownIsOpen)
                      }
                      className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                      id='user-menu'
                      aria-haspopup='true'
                    >
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=NUbxqHJFDM&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </button>
                  </div>
                  {/* Profile dropdown panel */}
                  <Transition
                    show={profileDropdownIsOpen}
                    enter='transition ease-out duration-200'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                    className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu'
                  >
                    <Link
                      to='/profile'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                    >
                      Your Profile
                    </Link>
                    <Link
                      to='/settings'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                    >
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                    >
                      Sign out
                    </button>
                  </Transition>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${mobileMenuIsOpen ? 'block' : 'hidden'} md:hidden`}
        id='mobile-menu'
      >
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          {isAuthenticated && (
            <NavLink
              to='/'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to='/users'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
          >
            Users
          </NavLink>
          <NavLink
            to='/areas'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
          >
            All Areas
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to='/myareas'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              My Areas
            </NavLink>
          )}
          {!isAuthenticated && (
            <NavLink
              to='/auth'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Log in
            </NavLink>
          )}
        </div>
        {isAuthenticated && (
          <div className='pt-4 pb-3 border-t border-gray-700'>
            <div className='flex items-center px-5 sm:px-6'>
              <div className='flex-shrink-0'>
                <Avatar user={user} />
              </div>
              <div className='ml-3'>
                <div className='text-base font-medium text-white'>{`${user.firstname} ${user.lastname}`}</div>
                <div className='text-sm font-medium text-gray-400'>
                  {user.email}
                </div>
              </div>
              <button className='ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                <span className='sr-only'>View notifications</span>
                <svg
                  className='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  />
                </svg>
              </button>
            </div>
            <div className='mt-3 px-2 space-y-1 sm:px-3'>
              <Link
                to='/profile'
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
              >
                Your Profile
              </Link>
              <Link
                to='/settings'
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
              >
                Settings
              </Link>
              <button
                onClick={logout}
                className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
