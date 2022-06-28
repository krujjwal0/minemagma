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

export function DetailsPage({
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

  function toDetails(){
    history.push('/regulatory/details');
    setNavBar(true);
  }

  return (
    <div className="content">
      {/* <div className=" mt-4  ml-6 w-[100%] h-[100%]" style={{ border: '2px solid red' }}> */}
      <div className=" mt-4  ml-6 w-[100%] h-[100%]">
        <div
          className="flex    mt-2 ml-8"
          style={{ width: '100%', height: '3rem' }}
        >
          <ArrowBackIosIcon className="mt-1" style={{ fontSize: '1rem' }} />
          <p className=" font-Nunito  ">
            <span
              className="text-[18px] font-Nunito font-bold "
              style={{ fontWeight: '700', color: '#132B6B' }}
            >
              Detail
            </span>{' '}
            <br />{' '}
            <span className="text-[11px] font-Nunito font-bold mt-1">
              Dashboard | Details
            </span>
          </p>
        </div>
        <Divider className="" />

        <div
          className=" flex w-full mt-3 ml-8"
          style={{ borderRadius: '20px' }}
        >
          <div className="rounded " style={{ width: '7rem', height: '8rem' }}>
            <img style={{ width: '7rem', height: '8rem' }} src={map} />
          </div>
          <div className="ml-6 w-full" style={{}}>
            <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
              Rajat Kapoor
            </p>
            <div className="flex justify-center w-20 bg-[#F66B6B] ml-1 mt-[6px] rounded-md h-4">
              <p className="text-center text-[11px] mt-[2px] text-white font-sans">
                #0123456789
              </p>
            </div>

            <div className="flex mt-6" style={{}}>
              <div className="ml-2">
                <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                  Reviewer
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Abhinandan Banerjee
                </p>
              </div>
              <div className="ml-24">
                <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                  Lead Reviewer
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Rupesh Bansal
                </p>
              </div>
              <div className="ml-24">
                <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                  Category
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  OTC
                </p>
              </div>
              <div className="ml-28">
                <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                  Department
                </p>
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Mining
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full mt-4 ml-9" style={{}}>
          <Typography className="mt-2">Select Rule</Typography>
          <div className="rounded-full ml-4">
            {/* <FormControl className={classes.formControl} > */}

            <Select
              // labelId="demo-simple-select-label"
              // id="demo-simple-select"
              style={{
                borderRadius: '20px',
                width: '180px',
                border: '1px solid black',
              }}
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={10}>RuleA</MenuItem>
              <MenuItem value={20}>RuleB</MenuItem>
              <MenuItem value={30}>Rulec</MenuItem>
            </Select>
            {/* </FormControl> */}
          </div>
          <div className="mt-2">
            <ArrowBackIosIcon className="ml-20" style={{ fontSize: '1rem' }} />
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>
            <span
              className="ml-6 p-0.5 rounded"
              style={{ backgroundColor: 'aqua' }}
            >
              hfe
            </span>

            <ArrowForwardIosIcon
              className="ml-8"
              style={{ fontSize: '1rem' }}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 mr-9">
          <span>
            <FiberManualRecordIcon style={{ fontSize: '0.5rem' }} />
            Selected
          </span>
          <span>
            <FiberManualRecordIcon style={{ fontSize: '0.5rem' }} />
            Completed
          </span>
          <span>
            <FiberManualRecordIcon style={{ fontSize: '0.5rem' }} />
            Incomplete
          </span>
        </div>
        <Grid
          className="mt-4 ml-6 rounded-t-lg mr-4"
          style={{ border: '1px solid #EAEAEA' }}
        >
          <div
            className="pt-2 pl-10 "
            style={{
              backgroundColor: '#EAEAEA',
              height: '40px',
              borderRadius: '30px',
            }}
          >
            <Typography className="text-[14px] font-Nunito font-normal text-[#132B6B] ">
              Section/Rules/ Clause/ Subclause No.{' '}
              <span className="ml-2 p-2" style={{ backgroundColor: '#8EF4D2' }}>
                5(4)
              </span>
            </Typography>
          </div>
          <div className="mt-4">
            <Typography className="text-[18px] font-sans font-bold text-[#132B6B]  pl-10">
              Title of the Rules/Regulations
            </Typography>
            <p className="text-[14px] font-sans font-normal text-[#000000] mt-[8px] pl-10 pb-4">
              Electrical Safety Officer
            </p>
          </div>
          <Divider className="mt-2" />
          <div className="mt-4">
            <Typography className="text-[18px] font-sans font-bold text-[#132B6B]  pl-10">
              Responsibility
            </Typography>
            <p className="text-[14px] font-sans font-normal text-[#000000] mt-[8px] pl-10 pb-4">
              Owner/Agent/Manager
            </p>
          </div>
          <Divider className="mt-2" />
          <div className="mt-4">
            <Typography className="text-[18px] font-sans font-bold text-[#132B6B]  pl-10">
              Description
            </Typography>
            <p className="text-[14px] font-sans font-normal text-[#000000] mt-[8px] pl-10 pb-4">
              (4) For every factory registered under Factory Act,1948, where
              more than 250 kW of electrical load is connected, the management
              of the factory shall designate a person having qualification
              specified in sub-regulation (2), for ensuring the observance of
              the safety provisions laid under the Act and the regulations made
              thereunder, who shall periodically inspect such installation, get
              them tested and keep a record thereof and such records shall be
              made available to the Electrical Inspector if and when required.
            </p>
          </div>
          <Divider className="mt-2" />
          <div className="mt-4">
            <Typography className="text-[18px] font-sans font-bold text-[#132B6B]  pl-10">
              Relevant Circulars
            </Typography>
            <p className="text-[14px] font-sans font-normal text-[#000000] mt-[8px] pl-10 pb-4">
              Owner/Agent/Manager
            </p>
          </div>
          <Divider className="mt-2" />
          <div className="mt-4">
            <ManageRemark style={{ border: '1px solid green' }} />
          </div>
        </Grid>
        <div className="mt-4">
          <Typography className="text-[14px] font-sans font-normal text-[#000000]  pl-10 pb-4">
            File Submit by : Rajat Kapoor 24 July, 2020 at 10:30 PM
          </Typography>
          <Button
            className="rounded-full "
            style={{
              background: '#F66B6B',
              marginLeft: '34px',
              height: '40px',
              width: '190px',
              borderRadius: '60px',
            }}
          >
            Generate Report
          </Button>
        </div>

        <div className="flex mt-6">
          <Button
            className="rounded-full "
            style={{
              background: '#F66B6B',
              marginLeft: '34px',
              height: '40px',
              width: '190px',
              borderRadius: '60px',
            }}
          >
            Preview
          </Button>
          <Button
            className="rounded-full "
            style={{
              background: '#F66B6B',
              marginLeft: '34px',
              height: '40px',
              width: '190px',
              borderRadius: '60px',
            }}
          >
            Next
          </Button>
          <Button
            className="rounded-full "
            style={{
              background: '#F66B6B',
              marginLeft: '34px',
              height: '40px',
              width: '190px',
              borderRadius: '60px',
            }}
          >
            Submit & Preview
          </Button>
        </div>
      </div>
    </div>
  );
}

DetailsPage.propTypes = {
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
)(DetailsPage);
