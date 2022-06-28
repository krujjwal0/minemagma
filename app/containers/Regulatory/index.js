/*
 * Regulatory
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
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
// import { Card, CardContent } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
// import ArrowBackIosIcon from '@material-ui/core/AccordionActions/ArrowBackIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Divider from '@material-ui/core/Divider';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Card, CardContent, FormGroup, Typography } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ManageRemark from './ManagRema';
import map from './image/map.png';
import photo from './image/profilepic.png';
import Users from './Users';
import saga from './saga';
import reducer from './reducer';
import { makeSelectUsername } from './selectors';
import { changeUsername } from './actions';
import { loadRepos } from '../App/actions';
import { Redirect, useHistory } from 'react-router-dom';
import { setNavBar } from '../App/actions';
import DetailsPage from './DetailsPage';

const key = 'regulatory';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function Regulatory({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
  setNavBar,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const history = useHistory();

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);
  const classes = useStyles();

  const reposListProps = {
    loading,
    error,
    repos,
  };

  const [age, setAge] = React.useState('RuleA');

  const handleChange = event => {
    setAge(event.target.value);
  };

  const routeChange = () => {
    const path = `/regulatory/details`;
    history.push(path);
  };

  return (
    <DetailsPage/>
  );
}

Regulatory.propTypes = {
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
)(Regulatory);
