import React, { useEffect, memo } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { Card } from '@material-ui/core';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'categories';

export function Categories({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  return (
    <div className="myprofile">
      <div className="w-full">
        <div className="ml-8 pt-1">
          <div className="mt-5 ml-10 text-xl text-[#151F63]">
            <i class="fa-solid fa-chevron-left" />
          </div>
          <div className="ml-4 mt-4 text-xl ">
            <p
              style={{ color: '#151F63', fontSize: '18px' }}
              className="font-sans font-semibold"
            >
              Add
            </p>
            <div className='flex'>
            <p
              style={{ color: '#F66B6B', fontSize: '11px' }}
              className=" font-sans ml-18"
            >
              {' '}
              Dashboard | 
            </p>
            <p className='text-[#151F63] text-[11px] font-sans ml-1'>Add</p>
            </div>
          </div>
        </div>
        <div className="bg-white h-screen">
          <div className="flex">
            <div>
              <form>
                <div className="ml-9 mt-8 font-sans font-semibold flex">
                  <p className='font-sans'>Select Department</p>
                  <p className='text-[red]'>*</p>
                </div>

                <select className="w-96 font-sans ml-9 mt-3 border-2 rounded-[20px] h-9">
                  <option className="ml-2 font-sans">Select</option>
                </select>

                <p className="ml-9 mt-7 font-sans font-semibold">Select</p>

                <select className="w-96 ml-9 mt-3 border-2 rounded-[20px] h-9">
                  <option className="ml-2 font-sans">Select OTC</option>
                </select>

                <p className="ml-9 mt-11 font-sans font-semibold">Date</p>

                <select className="w-96 ml-9 mt-3 border-2 rounded-[20px] h-9">
                  <option className="ml-2 font-sans">Select Your Date </option>
                </select>
              </form>
            </div>
            <div className="bg-[#E5E5E5] ml-6 rounded-lg mt-8">
              <form className="mr-6 mb-6">
                <p className="ml-9 mt-8 font-sans font-semibold flex">
                  <p>Select Assign Person</p>
                  <p className='text-[red]'>*</p>
                </p>
                <select className="w-96 ml-9 mt-3 border-2 rounded-[20px] h-9">
                  <option className="ml-2 font-sans">Select</option>
                </select>

                <p className="ml-9 mt-4 font-sans font-semibold">Select Reveiwer</p>

                <select className="w-96 ml-9 mt-3 border-2 rounded-[20px] h-9">
                  <option className="ml-2 font-sans">Select </option>
                </select>

                <p className="ml-9 mt-4 font-sans font-semibold">
                  Select Lead Reveiwer
                </p>

                <select className="w-96 ml-9 mt-3 border-2 rounded-[20px] h-9 font-sans">
                  <option className="ml-2">Select</option>
                </select>
              </form>
            </div>
          </div>
          <div className="pt-10 ml-9">
            <button
              className="w-28 h-10"
              style={{
                backgroundColor: 'rgb(246, 107, 107)',
                color: 'white',
                borderRadius: '50px',
              }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Categories.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Categories);
