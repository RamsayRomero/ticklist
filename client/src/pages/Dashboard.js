import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAscentsByUser } from '../redux/actions/ascents';
import { logout } from '../redux/actions/auth';
import Avatar from '../components/Avatar';
import formatDate from '../utils/formatDate';
import HashLoader from 'react-spinners/HashLoader';
import LogAscent from '../components/LogAscent';

export const Dashboard = ({
  user,
  getAscentsByUser,
  loading,
  ascents,
  areas,
  logout,
}) => {
  const [logAscentIsOpen, setLogAscentIsOpen] = useState(false);
  const [editAscentMode, setEditAscentMode] = useState(false);
  const [accountDropdownIsOpen, setAccountDropdownIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    area: '',
    grade: 'VB',
    date: '',
    flash: false,
    fa: false,
    youtube: '',
    instagram: '',
  });

  useEffect(() => {
    getAscentsByUser(user._id);
    console.log(ascents);
  }, [getAscentsByUser]);

  return (
    <div className='h-screen flex overflow-hidden bg-white'>
      <LogAscent
        editMode={editAscentMode}
        setFormData={setFormData}
        formData={formData}
        isOpen={logAscentIsOpen}
        onClose={() => setLogAscentIsOpen(false)}
      />
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      {sidebarOpen && (
        <div className='lg:hidden'>
          <div className='fixed inset-0 flex z-40'>
            {/* <!--
        Off-canvas menu overlay, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      --> */}
            <div className='fixed inset-0' aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-600 opacity-75'></div>
            </div>
            {/* <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      --> */}
            <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white'>
              <div className='absolute top-0 right-0 -mr-12 pt-2'>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                >
                  <span className='sr-only'>Close sidebar</span>
                  <svg
                    className='h-6 w-6 text-white'
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
              <div className='flex-shrink-0 flex items-center px-4'>
                <img
                  className='h-8 w-auto'
                  src='https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg'
                  alt='Workflow'
                />
              </div>
              <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                <nav className='px-2'>
                  <div className='space-y-1'>
                    {/* <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:text-gray-900 hover:bg-gray-50" --> */}
                    <a
                      href='#'
                      className='bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                      aria-current='page'
                    >
                      {/* <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" --> */}
                      <svg
                        className='text-gray-500 mr-3 h-6 w-6'
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
                          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                        />
                      </svg>
                      Dashboard
                    </a>

                    <a
                      href='#'
                      className='text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                    >
                      <svg
                        className='text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6'
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
                          d='M4 6h16M4 10h16M4 14h16M4 18h16'
                        />
                      </svg>
                      My tasks
                    </a>

                    <a
                      href='#'
                      className='text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                    >
                      <svg
                        className='text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6'
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
                          d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      Recent
                    </a>
                  </div>
                  <div className='mt-8'>
                    <h3
                      className='px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'
                      id='teams-headline'
                    >
                      Teams
                    </h3>
                    <div
                      className='mt-1 space-y-1'
                      role='group'
                      aria-labelledby='teams-headline'
                    >
                      <a
                        href='#'
                        className='group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50'
                      >
                        <span
                          className='w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full'
                          aria-hidden='true'
                        ></span>
                        <span className='truncate'>Engineering</span>
                      </a>

                      <a
                        href='#'
                        className='group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50'
                      >
                        <span
                          className='w-2.5 h-2.5 mr-4 bg-green-500 rounded-full'
                          aria-hidden='true'
                        ></span>
                        <span className='truncate'>Human Resources</span>
                      </a>

                      <a
                        href='#'
                        className='group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50'
                      >
                        <span
                          className='w-2.5 h-2.5 mr-4 bg-yellow-500 rounded-full'
                          aria-hidden='true'
                        ></span>
                        <span className='truncate'>Customer Success</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
            <div className='flex-shrink-0 w-14' aria-hidden='true'>
              {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
            </div>
          </div>
        </div>
      )}

      {/* <!-- Static sidebar for desktop --> */}
      <div className='hidden lg:flex lg:flex-shrink-0'>
        <div className='flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100'>
          <div className='flex items-center flex-shrink-0 px-6'>
            <img
              className='h-8 w-auto'
              src='https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg'
              alt='Workflow'
            />
          </div>
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className='h-0 flex-1 flex flex-col overflow-y-auto'>
            {/* <!-- User account dropdown --> */}
            <div className='px-3 mt-6 relative inline-block text-left'>
              <div>
                <button
                  onClick={() =>
                    setAccountDropdownIsOpen(!accountDropdownIsOpen)
                  }
                  type='button'
                  className='group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500'
                  id='options-menu'
                  aria-expanded='false'
                  aria-haspopup='true'
                >
                  <span className='flex w-full justify-between items-center'>
                    <span className='flex min-w-0 items-center justify-between space-x-3'>
                      <Avatar user={user} />
                      <span className='flex-1 min-w-0'>
                        <span className='text-gray-900 text-sm font-medium truncate'>
                          {`${user.firstname} ${user.lastname}`}
                        </span>
                      </span>
                    </span>
                    <svg
                      className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                </button>
              </div>
              {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
              {accountDropdownIsOpen && (
                <div
                  className='z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='options-menu'
                >
                  <div className='py-1' role='none'>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      role='menuitem'
                    >
                      View profile
                    </a>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      role='menuitem'
                    >
                      Settings
                    </a>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      role='menuitem'
                    >
                      Notifications
                    </a>
                  </div>
                  <div className='py-1' role='none'>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      role='menuitem'
                    >
                      Get desktop app
                    </a>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      role='menuitem'
                    >
                      Support
                    </a>
                  </div>
                  <div className='py-1' role='none'>
                    <button
                      onClick={logout}
                      className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      role='menuitem'
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* <!-- Sidebar Search --> */}
            <div className='px-3 mt-5'>
              <label htmlFor='search' className='sr-only'>
                Search
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div
                  className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'
                  aria-hidden='true'
                >
                  <svg
                    className='mr-3 h-4 w-4 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  name='search'
                  id='search'
                  className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md'
                  placeholder='Search'
                />
              </div>
            </div>
            {/* <!-- Navigation --> */}
            <nav className='px-3 mt-6'>
              <div className='space-y-1'>
                {/* <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-700 hover:text-gray-900 hover:bg-gray-50" --> */}
                <a
                  href='#'
                  className='bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                >
                  {/* <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" --> */}
                  <svg
                    className='text-gray-500 mr-3 h-6 w-6'
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
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                  Dashboard
                </a>

                <a
                  href='#'
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                >
                  <svg
                    className='text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6'
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
                      d='M4 6h16M4 10h16M4 14h16M4 18h16'
                    />
                  </svg>
                  My tasks
                </a>

                <a
                  href='#'
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                >
                  <svg
                    className='text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6'
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
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  Recent
                </a>
              </div>
              <div className='mt-8'>
                {/* <!-- Secondary navigation --> */}
                <h3
                  className='px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'
                  id='teams-headline'
                >
                  Teams
                </h3>
                <div
                  className='mt-1 space-y-1'
                  role='group'
                  aria-labelledby='teams-headline'
                >
                  <a
                    href='#'
                    className='group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50'
                  >
                    <span
                      className='w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full'
                      aria-hidden='true'
                    ></span>
                    <span className='truncate'>Engineering</span>
                  </a>

                  <a
                    href='#'
                    className='group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50'
                  >
                    <span
                      className='w-2.5 h-2.5 mr-4 bg-green-500 rounded-full'
                      aria-hidden='true'
                    ></span>
                    <span className='truncate'>Human Resources</span>
                  </a>

                  <a
                    href='#'
                    className='group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50'
                  >
                    <span
                      className='w-2.5 h-2.5 mr-4 bg-yellow-500 rounded-full'
                      aria-hidden='true'
                    ></span>
                    <span className='truncate'>Customer Success</span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- Main column --> */}
      <div className='flex flex-col w-0 flex-1 overflow-hidden'>
        {/* <!-- Search header --> */}
        <div className='relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden'>
          {/* <!-- Sidebar toggle, controls the 'sidebarOpen' sidebar state. --> */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden'
          >
            <span className='sr-only'>Open sidebar</span>
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
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </button>
          <div className='flex-1 flex justify-between px-4 sm:px-6 lg:px-8'>
            <div className='flex-1 flex'>
              <form className='w-full flex md:ml-0' action='#' method='GET'>
                <label htmlFor='search_field' className='sr-only'>
                  Search
                </label>
                <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                  <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                    <svg
                      className='h-5 w-5'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <input
                    id='search_field'
                    name='search_field'
                    className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm'
                    placeholder='Search'
                    type='search'
                  />
                </div>
              </form>
            </div>
            <div className='flex items-center'>
              {/* <!-- Profile dropdown --> */}
              <div className='ml-3 relative'>
                <div>
                  <button
                    onClick={() =>
                      setAccountDropdownIsOpen(!accountDropdownIsOpen)
                    }
                    type='button'
                    className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                    id='user-menu'
                    aria-expanded='false'
                    aria-haspopup='true'
                  >
                    <span className='sr-only'>Open user menu</span>
                    <Avatar user={user} />
                  </button>
                </div>

                {/* <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
                {accountDropdownIsOpen && (
                  <div
                    className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu'
                  >
                    <div className='py-1' role='none'>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                      >
                        View profile
                      </a>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                      >
                        Settings
                      </a>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                      >
                        Notifications
                      </a>
                    </div>
                    <div className='py-1' role='none'>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                      >
                        Get desktop app
                      </a>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                      >
                        Support
                      </a>
                    </div>
                    <div className='py-1' role='none'>
                      <button
                        onClick={logout}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <main
          className='flex-1 relative z-0 overflow-y-auto focus:outline-none'
          tabIndex='0'
        >
          {/* <!-- Page title & actions --> */}
          <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
            <div className='flex-1 min-w-0'>
              <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
                Dashboard
              </h1>
            </div>
            <div className='mt-4 flex sm:mt-0 sm:ml-4'>
              <button
                onClick={() => {
                  setEditAscentMode(false);
                  setFormData({
                    name: '',
                    rating: 0,
                    area: '',
                    grade: 'VB',
                    date: '',
                    flash: false,
                    fa: false,
                    youtube: '',
                    instagram: '',
                  });
                  setLogAscentIsOpen(true);
                }}
                type='button'
                className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3'
              >
                Log ascent
              </button>
            </div>
          </div>
          {/* <!-- My areas --> */}
          <div className='px-4 mt-6 sm:px-6 lg:px-8'>
            <h2 className='text-gray-500 text-xs font-medium uppercase tracking-wide'>
              My areas
            </h2>
            <ul className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3'>
              <li className='relative col-span-1 flex shadow-sm rounded-md'>
                {areas.map((area) => (
                  <div className='px-4 py-2' key={area._id}>
                    {area.title}
                  </div>
                ))}
              </li>

              {/* <!-- More items... --> */}
            </ul>
          </div>

          {/* Projects table */}
          {loading ? (
            <div className='flex justify-center mt-24'>
              <HashLoader loading={loading} />
            </div>
          ) : (
            <div className='mt-8'>
              <div className='align-middle inline-block min-w-full border-b border-gray-200'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Name
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Area
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Grade
                      </th>
                      <th
                        scope='col'
                        className='hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Rating
                      </th>
                      <th
                        scope='col'
                        className='hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Date
                      </th>
                      <th scope='col' className='relative px-6 py-3'>
                        <span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {ascents.map((ascent) => (
                      <tr key={ascent._id}>
                        <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                          {ascent.name}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-500'>
                          {ascent.area.title}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-500'>
                          {ascent.grade}
                        </td>
                        <td className='hidden md:table-cell px-6 py-4 text-sm text-gray-500'>
                          {ascent.rating}
                        </td>
                        <td className='hidden sm:table-cell px-6 py-4 text-sm text-gray-500'>
                          {formatDate(ascent.date)}
                        </td>
                        <td className='px-6 py-4 text-right text-sm font-medium'>
                          <button
                            onClick={() => {
                              setEditAscentMode(true);
                              setFormData(ascent);
                              setLogAscentIsOpen(true);
                              console.log(formData);
                            }}
                            className='text-indigo-600 hover:text-indigo-900'
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.ascents.loading,
  areas: state.areas.areas,
  ascents: state.ascents.ascents,
});

export default connect(mapStateToProps, { getAscentsByUser, logout })(
  Dashboard
);
