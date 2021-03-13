import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { connect } from 'react-redux';
import { logAscent } from '../redux/actions/ascents';
import Rating from '@material-ui/lab/Rating';

const LogAscent = ({ isOpen, onClose, logAscent }) => {
  const [formData, setFormData] = useState({
    rating: 0,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Transition show={isOpen} className='fixed z-20 inset-0 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        {/* Background overlay */}
        <Transition.Child
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          className='fixed inset-0 transition-opacity'
          aria-hidden='true'
        >
          <div
            onClick={onClose}
            className='absolute cursor-pointer inset-0 bg-gray-500 opacity-75'
          ></div>
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>
        {/* Modal panel */}
        <Transition.Child
          enter='ease-out duration-300'
          enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          enterTo='opacity-100 translate-y-0 sm:scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0 sm:scale-100'
          leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
            <button
              type='button'
              onClick={onClose}
              className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <span className='sr-only'>Close</span>
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
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <h3>Log Ascent</h3>
          <form className='space-y-8 divide-y divide-gray-200'>
            <div className='mt-6 grid gap-y-6 gap-x-4 grid-cols-6'>
              <div className='col-span-6'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Name
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='col-span-6'>
                <label
                  htmlFor='area'
                  className='block text-sm font-medium text-gray-700'
                >
                  Area
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='area'
                    id='area'
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='col-span-3 sm:col-span-2'>
                <label
                  for='grade'
                  class='block text-sm font-medium text-gray-700'
                >
                  Grade
                </label>
                <select
                  id='grade'
                  name='grade'
                  class='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
                >
                  <option>VB</option>
                  <option>V0</option>
                  <option>V1</option>
                  <option>V2</option>
                  <option>V3</option>
                  <option>V4</option>
                  <option>V5</option>
                  <option>V6</option>
                  <option>V7</option>
                  <option>V8</option>
                  <option>V9</option>
                  <option>V10</option>
                  <option>V11</option>
                  <option>V12</option>
                  <option>V13</option>
                  <option>V14</option>
                  <option>V15</option>
                  <option>V16</option>
                  <option>V17</option>
                </select>
              </div>
              <div className='col-span-3 sm:col-span-2'>
                <label
                  htmlFor='date'
                  className='block text-sm font-medium text-gray-700'
                >
                  Date
                </label>
                <div className='mt-1'>
                  <input
                    type='date'
                    name='date'
                    id='date'
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='col-span-6 sm:col-span-2'>
                <label
                  htmlFor='rating'
                  className='block text-sm font-medium text-gray-700'
                >
                  Rating
                </label>
                <div className='mt-2'>
                  <Rating
                    name='rating'
                    max={4}
                    value={formData.rating}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className='col-span-3 sm:col-span-2'>
                <div class='relative flex items-start'>
                  <div class='flex items-center h-5'>
                    <input
                      id='flash'
                      name='flash'
                      type='checkbox'
                      class='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                    />
                  </div>
                  <div class='ml-3 text-sm'>
                    <label for='flash' class='font-medium text-gray-700'>
                      Flash
                    </label>
                  </div>
                </div>
              </div>
              <div className='col-span-3 sm:col-span-2'>
                <div class='relative flex items-start'>
                  <div class='flex items-center h-5'>
                    <input
                      id='first-ascent'
                      name='first-ascent'
                      type='checkbox'
                      class='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                    />
                  </div>
                  <div class='ml-3 text-sm'>
                    <label for='first-ascent' class='font-medium text-gray-700'>
                      First ascent
                    </label>
                  </div>
                </div>
              </div>
              <div className='col-span-6'>
                <label
                  htmlFor='beta'
                  className='block text-sm font-medium text-gray-700'
                >
                  Beta
                </label>
                <div class='mt-1 flex rounded-md shadow-sm'>
                  <span class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm'>
                    youtube.com/
                  </span>
                  <input
                    type='text'
                    name='youtube'
                    id='youtube'
                    autocomplete='youtube'
                    class='flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                  />
                </div>
                <div class='mt-1 flex rounded-md shadow-sm'>
                  <span class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm'>
                    instagram.com/
                  </span>
                  <input
                    type='text'
                    name='instagram'
                    id='instagram'
                    autocomplete='instagram'
                    class='flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                  />
                </div>
              </div>
            </div>
          </form>
          <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm'
            >
              Deactivate
            </button>
            <button
              onClick={onClose}
              type='button'
              className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
            >
              Dismiss
            </button>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default connect(null, { logAscent })(LogAscent);
