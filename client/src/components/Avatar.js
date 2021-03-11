import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ user, size }) => {
  if (user.avatar) {
    return (
      <img
        className={`h-${size} w-${size} rounded-full`}
        src={user.avatar}
        alt=''
      />
    );
  } else {
    return (
      <span
        className={`inline-flex items-center justify-center h-${size} w-${size} rounded-full bg-gray-500`}
      >
        <span className='font-medium leading-none text-white'>
          {user.firstname.charAt(0) + user.lastname.charAt(0)}
        </span>
      </span>
    );
  }
};

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  size: 10,
};

export default Avatar;
