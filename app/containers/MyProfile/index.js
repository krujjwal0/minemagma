/*
 * Categories
 *
 * This is the first thing users see of our App, at the '/' route
 */

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
import photo from './image/profilepic.png';

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
      <div className='w-full'>
      <div className="ml-8 pt-1 ">
        <div className="mt-5 ml-10 text-xl text-[#151F63]">
          <i className="fa-solid fa-chevron-left" />
        </div>
        <div className="ml-4 mt-4 text-xl ">
          <p
            style={{ color: '#151F63', fontSize: '18px' }}
            className="font-sans font-semibold"
          >
            My Profile
          </p>
          <p
            style={{ color: '#F66B6B', fontSize: '11px' }}
            className=" font-sans ml-18"
          >
            Dashboard | <span style={{ color: '#151F63' }}>My Profile </span>
          </p>
          <hr />
        </div>
        <div className="flex justify-center">
          <Card
            className='mt-12 w-2/6 h-[65vh] flex justify-center '
          >
            <CardContent>
              <div className="text-right font-bold font-sans mt-2">
                <EditIcon className="" /> Edit
              </div>
              <CardContent className="flex justify-center">
                <img className='h-24' src={photo} />
              </CardContent>
              <CardContent className='-mt-6'>
              <p className="flex justify-center  text-2xl font-sans font-bold">
                Rajat Kapoor
              </p>
              <div className=" flex justify-center  bg-[#F66B6B] rounded-md ">
                <p className="text-center text-sm text-white font-sans">
                  Employee ID #0123456789
                </p>
              </div>
              </CardContent>
              <p className="text-[#66737E] flex justify-center mt-2 font-sans text-xs font-bold">
                Phone
              </p>
              <p className="text-[#132B6B] flex justify-center font-sans text-xl font-bold">
                +916532565889
              </p>
              <p className="text-[#66737E] flex justify-center mt-6 font-sans text-xs font-bold">
                Email Address
              </p>
              <p className="text-[#132B6B] flex justify-center font-sans text-xl font-bold">
                rajatkapoor@digimine.com
              </p>
            </CardContent>
          </Card>
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
