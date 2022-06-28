/*
 * Categories
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import HistoryCard from '../History';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Card, CardContent, FormGroup, Typography } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import emp_image from '../../images/emp_image.png';
import DialogContent from '@material-ui/core/DialogContent';
import { alpha, styled, withStyles } from '@material-ui/core/styles';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[600],
  },
}));
const label = { inputProps: { 'aria-label': 'Switch demo' } };
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
        <div className="ml-8 ">
          <div className="ml-4 mt-3 text-xl ">
            <p
              style={{ color: '#151F63', fontSize: '18px' }}
              className="font-sans font-semibold"
            >
              Categories
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
          <div className="">
          <Card>
        <CardContent>
          <div className="flex rounded-full">
            <div className="">
              <img
                className="rounded-full ml-3 w-[41px] h-[41px]"
               src= {emp_image}
              />
            </div>

            <div className="ml-10">
              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                Employee
              </p>
              <div className="flex">
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                
                </p>
                <div className="flex justify-center w-20 bg-[#F66B6B] ml-1 mt-[6px] rounded-md h-4">
                  <p className="text-center text-[11px] mt-[2px] text-white font-sans">
                    #0123456789
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-10">
              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                Department
              </p>
              <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                Mining
              </p>
            </div>
            <div className="ml-12">
              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                Phone
              </p>
              <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                97845 56895
              </p>
            </div>
            <div className="ml-12">
              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                Email ID
              </p>
              <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                rkapoor@gmail.com
              </p>
            </div>
            <div className="ml-12">
              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                Active
              </p>
              {/* <FormControlLabel
                control={<IOSSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                
              /> */}
              <GreenSwitch {...label} defaultChecked />
            </div>
           
            <Dialog  className="w-50 h-50">
              <DialogContent
                style={{
                  borderRadius: '15px',
                  background: '#FFFFFF',
                  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
                  Width: '604px',
                  Height: '494px',
                }}
              >
              
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
        </Card>


            
          </div>
          <div className="flex">
           
          </div>
        </div>
      </div>
   
        {/* <div className='w-1/2'> Ruchi</div> */}
      {/* <div className='w-1/5 h-screen bg-gray-500'>
        <SideNavigation />
      </div>
      <div className='w-4/5 h-full'>
        <div className='w-full h-20'>
          notification icon at corner
        </div>
        <div className='w-full' style={{ height: '673px' }}>
          content show
        </div>
      </div> */}
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