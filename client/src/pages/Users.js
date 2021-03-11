import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from '../redux/actions/users';
import HashLoader from 'react-spinners/HashLoader';
import Navbar from '../components/Navbar';
import ErrorModal from '../components/ErrorModal';
import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';

const Users = ({ getUsers, loading, errors, users }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  useEffect(() => {
    if (errors) {
      setErrorModalIsOpen(true);
    } else {
      setErrorModalIsOpen(false);
    }
  }, [errors]);

  return (
    <div className='min-h-screen'>
      <Navbar />
      <h2 className='text-2xl font-medium p-4'>All Users</h2>

      {loading && (
        <div className='flex justify-center py-16'>
          <HashLoader loading={loading} size={80} />
        </div>
      )}

      <ErrorModal
        isOpen={errorModalIsOpen}
        onClose={() => setErrorModalIsOpen(false)}
        errorMessage={errors && errors[0].msg}
      />
      {users && (
        <div class='p-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {users.map((user) => (
            <div
              key={user._id}
              class='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
            >
              <div class='flex-shrink-0'>
                <Avatar user={user} />
              </div>
              <div class='flex-1 min-w-0'>
                <Link to={`/users/${user._id}`} class='focus:outline-none'>
                  <span class='absolute inset-0' aria-hidden='true'></span>
                  <p class='text-sm font-medium text-gray-900'>
                    {`${user.firstname} ${user.lastname}`}
                  </p>
                  <p class='text-sm text-gray-500 truncate'>
                    {`${user.ascents.length} ascents`}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.any,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users.users,
  loading: state.users.loading,
  errors: state.users.errors,
});

export default connect(mapStateToProps, { getUsers })(Users);
