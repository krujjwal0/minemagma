import React, { useEffect, useState, memo } from 'react';
import './style.css';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { Redirect } from 'react-router-dom';
import { validateOtpAction, getAdminLocationsAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import Resend from './images/resendImage.svg';
import LoginImage from './images/Logo.svg';
import { setNavBar } from '../App/actions';

const key = 'loginReducer';

export function ChooseLocation(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [choosedLocation, setChoosedLocation] = useState(props.adminLocations[0]);
  const [userFeedbackStatus, setUserFeedbackStatus] = useState();

  useEffect(() => {
    console.log('admin Locations', props.adminLocations, props.feedbackCompleted);
  }, [props.adminLocations, props.showFeedback]);

  const setRedirectToFeedbackPage=()=>{
    setUserFeedbackStatus(props.userData.feedbackCompleted);
  }

  useEffect(() => {
    console.log('callGetLocationAction Send data in Action', props.feedbackCompleted);
    // const data='';
    props.getAdminLocationsAction();
  }, []);

  
  if (userFeedbackStatus == false) {
    return <Redirect to={{ pathname: '/form' }} />;
  } else if(userFeedbackStatus == true){
    // props.setNavBar(true);
    return <Redirect to={{ pathname: '/dashboard' }} />;
  }

  const selectLocation = value => {
    console.log(value);
    // Call api to show users list of particular Location
  };

  return (
    <div className="font-sans location_page  py-">
      <div className="container h-full min-h-full relative z-10">
        <div
          className="w-1/2  -mt-10 quote_box md:text-2xl text-xl font-semibold"
          style={{ marginLeft: '42%' }}
        >
          <h3 className="text-white font-sans">Choose Location</h3>
        </div>
        <div
          className="flex justify-end mt-20 flex-wrap h-full  min-h-full items-center"
          style={{ marginRight: '23%' }}
        >
          <div className="card bg-white shadow-lg rounded-3xl py-10 px-10 max-w-xl w-8/12">
            <div className="flex mt-7 mb-7 w-full  justify-between">
              <div className="w-full h-5 ml-4 ">
                <select
                  className=" font-sans  text-gray-150 w-full  text-black h-10 pl-4 pr-8 -mt-12 bg-white hover:border-gray-400"
                  onClick={selectLocation}
                  value={choosedLocation}
                >
                  {/* {props.adminLocations ? */}
                  {props.adminLocations.map((data, index) => {
                    console.log(data);
                    return (
                      <option key={index} name={data} value={data.id}>
                        {data.name}
                      </option>
                    );
                  })}
                  {/* : <option>No data Available</option>} */}

                  {/* <option selected>Banglore</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option> */}
                </select>
                <div className="w-full">
                  <Divider />
                </div>

                <div className="form_box w-full mt-40 ml-24  ">
                  <Button
                    className="bg_red  mx-auto   font-sans login_btn  w-60 h-14 rounded-4xl my-5"
                    style={{ borderRadius: '30px' }}
                    onClick={() => setRedirectToFeedbackPage()}
                  >
                    <p className="font-sans " style={{ color: '#fff' }}>
                      Continue
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* <div className="msg_box  flex flex-wrap pt-5">
          <div className="w-1/2 lg:-mt-20 quote_box md:text-4xl text-2xl font-bold"><h3 className="text-white font-sans"></h3></div>
<div className="copyright_text w-1/2 text-center text-xs font-sans text-white">© 2020 MineMagma. All Rights Reserved</div>
        </div> */}
      </div>
    </div>
  );
}
ChooseLocation.propTypes = {
  // userName: PropTypes.string,
  // onValidateOtp: PropTypes.func,
};

const mapStateToProps = state => ({
  adminLocations:
    state.loginReducer.adminLocations.length > 0
      ? state.loginReducer.adminLocations
      : [],
  showFeedback: state.loginReducer.showFeedback,
  feedbackCompleted: state.loginReducer.userData.feedbackCompleted,
  userData: state.loginReducer.userData
});

export function mapDispatchToProps(dispatch) {
  return {
    onValidateOtp: data => dispatch(validateOtpAction(data)),
    getAdminLocationsAction: data => dispatch(getAdminLocationsAction(data)),    
    setNavBar: data => dispatch(setNavBar(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChooseLocation);
