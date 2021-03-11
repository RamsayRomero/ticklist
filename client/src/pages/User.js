import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAscentsByUser } from '../redux/actions/ascents';
import formatDate from '../utils/formatDate';
import HashLoader from 'react-spinners/HashLoader';
import Navbar from '../components/Navbar';
import ErrorModal from '../components/ErrorModal';

const User = ({ user, ascents, getAscentsByUser, loading, errors, match }) => {
  useEffect(() => {
    getAscentsByUser(match.params.user_id);
    console.log(match.params.user_id);
  }, [getAscentsByUser, match.params.user_id]);

  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  useEffect(() => {
    if (errors) {
      setErrorModalIsOpen(true);
    } else {
      setErrorModalIsOpen(false);
    }
  }, [errors]);

  return (
    <div>
      <Navbar />
      <ErrorModal
        isOpen={errorModalIsOpen}
        onClose={() => setErrorModalIsOpen(false)}
        errorMessage={errors && errors[0].msg}
      />
      {loading && (
        <div className='flex justify-center py-16'>
          <HashLoader loading={loading} size={80} />
        </div>
      )}
      {user && (
        <>
          <h2 className='text-2xl font-medium p-4'>{`${user.firstname} ${user.lastname}'s ascents`}</h2>
          <div className='flex flex-col'>
            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
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
                            <a
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  ascents: PropTypes.array.isRequired,
  getAscentsByUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.any,
};

const mapStateToProps = (state) => ({
  user: state.ascents.user,
  ascents: state.ascents.ascents,
  loading: state.ascents.loading,
  errors: state.ascents.errors,
});

export default connect(mapStateToProps, { getAscentsByUser })(User);
