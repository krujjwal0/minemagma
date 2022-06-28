/*
 * Categories
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { alpha, makeStyles } from '@material-ui/core/styles';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
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
import HistoryCard from './HistoryCard';

const key = 'history';

export function History({
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
        <div className="ml-8 ">
          <div className="ml-4 mt-3 text-xl ">
            <p
              style={{ color: '#151F63', fontSize: '18px' }}
              className="font-sans font-semibold"
            >
              History
            </p>
            <p
              style={{ color: '#F66B6B', fontSize: '11px' }}
              className=" font-sans ml-18"
            >
              Dashboard | <span style={{ color: '#151F63' }}>History</span>
            </p>
            <hr />
          </div>
          <div className="flex ">
            <form>
              <select className="w-36 m-4 border-2 rounded-[20px] h-9">
                <option>Department</option>
              </select>
            </form>
            <button
              className="w-28 h-9 m-4"
              style={{
                backgroundColor: '#C4C4C4',
                color: 'white',
                borderRadius: '50px',
                width: '112px',
              }}
            >
              SEARCH
            </button>
            <div className="mt-4 w-96 h-8 flex item-strech border-2 rounded-[20px]">
              <InputBase
                placeholder="Search by Report Name."
                inputProps={{ 'aria-label': 'search' }}
              />
              <SearchIcon className="ml-72" />
            </div>
          </div>
          <div className="flex">
            <HistoryCard />
            <HistoryCard />
          </div>
          <div className="flex">
            <HistoryCard />
            <HistoryCard />
          </div>
        </div>
      </div>
    </div>
  );
}

History.propTypes = {
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
)(History);
