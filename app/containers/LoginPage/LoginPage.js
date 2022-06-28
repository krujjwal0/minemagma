import React, { useEffect, useState, memo } from 'react';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect, useHistory } from 'react-router-dom';
import LoginImage from './images/Logo.svg';
import Resend from './images/resendImage.svg';
import './style.css';

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

import { checkEmailError, generateOtpByEmailIdAction, setEmailId, showOtpErrorPopupAction } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import CustomizedDialogs from '../../components/Dialog/DialogMsg';

const key = 'loginReducer';

export function Login({ loading, error, onGenerateOtpByEmailIdAction, onSetEmailId, showOtpPage, emailError, checkEmailError, showOtpErrorPopup, showOtpErrorPopupAction }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const history = useHistory();
  console.log("History ==", history)

  const [emailId, setEmailId] = useState('');
  const [errorInEmail, setError] = useState(emailError);

  useEffect(() => {
    setError('');
    console.log('showOtpErrorPopup Login', showOtpErrorPopup )
  }, [])

  
  useEffect(() => {
    console.log('onUpdateShowOtpErrorPopup Login', showOtpErrorPopup )
  }, [showOtpErrorPopup])



  const login = () => {
    showOtpPage = true;
    console.log("login for otp");
    if (emailId == '') {
      // console.log('Email required..')
      checkEmailError('Email Required')
    } else {
      onSetEmailId(emailId);
      onGenerateOtpByEmailIdAction(emailId);
    }
  };

  useEffect(() => {
    console.log("err.response.status == 400 useEffect  ", emailError, errorInEmail);
    setError(emailError);
  }, [emailError]);

  useEffect(() => {
    console.log("showOtpPage", showOtpPage)
    if (showOtpPage) {
      history.push('/otp')
    }
  }, [showOtpPage])

  return (
    <div className="font-sans login_page  py-">
      <div className="container h-full min-h-full relative z-10">
        <div className="flex justify-end flex-wrap h-full  min-h-full items-center">
          <div className="card bg-white shadow-lg rounded-3xl py-10 px-10 max-w-xl w-1/2">
            <div className="logo text-center">
              <img
                src={LoginImage}
                alt="LoginImage"
                className="w-72 mx-auto mb-5"
              />
            </div>
            <h1 className="text-center font-bold font-sans text-3xl mb-8 text_blue mt-16">
              Login
            </h1>
            <div className="form_box pt-8 w-full">
              <TextField
                error
                name="emailId"
                type="email"
                id="standard-error-helper-text"
                placeholder="Enter Your Username"
                value={emailId}
                onChange={event => { setEmailId(event.target.value); setError(''); }}

                //helperText="Error message."
                variant="standard"
                style={{ width: '100%', color: '#6E7B8B', fontSize: '16px' }}
              />
              <p className="text-right mb-32 mt-2 font-sans text-red-500">
                {errorInEmail}
              </p>


              {/* <TextField
                name="password"
                type="password"
                placeholder="***"
                      style={{width:'100%', color:'#6E7B8B', fontSize:'20px', marginBottom:'30px'}}
              /> */}
              {/* <p className="text_red text-center my-4 font-sans font-medium"  style={{ fontSize:'14px'}}>Invalid username and password</p> */}
              <Button
                className="bg_red mx-auto  font-bold login_btn  w-60 h-14 rounded-3xl my-5 "
                onClick={(e) => login(e)}
              >
                Login
              </Button>

              {/* <p className="text-center mt-7 font-medium"  style={{ fontSize:'14px', color:'#124D50'}}><Link href="#" className="font-sans">Forgot Your password?</Link></p> */}
            </div>
          </div>
        </div>
        <div className="msg_box  flex flex-wrap pt-5">
          <div className="w-1/2 lg:-mt-20 quote_box md:text-4xl text-2xl font-bold">
            <h3 className="text-white font-sans">Smart Platform for</h3>
            <h3 className="text_blue  font-sans">Smart People</h3>
          </div>
          <div className="copyright_text w-1/2 text-center text-xs font-sans text-white">
            © 2020 MineMagma. All Rights Reserved
          </div>
        </div>
      </div>
      {showOtpErrorPopup.status ? <CustomizedDialogs errorMessage={showOtpErrorPopup.msg} showDialog={showOtpErrorPopup.status} showOtpErrorPopupAction={showOtpErrorPopupAction} /> : null}
    </div>
  );
}

Login.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // onSubmitForm: PropTypes.func,
  // username: PropTypes.string,
  onGenerateOtpByEmailIdAction: PropTypes.func,
  onSetEmailId: PropTypes.func
};

const mapStateToProps = state => {
  return {
    showOtpPage: state.loginReducer.showOtpPage,
    emailError: state.loginReducer.emailError,
    showOtpErrorPopup: state.loginReducer.showOtpErrorPopup,
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onGenerateOtpByEmailIdAction: data => dispatch(generateOtpByEmailIdAction(data)),
    onSetEmailId: data => dispatch(setEmailId(data)),
    checkEmailError: data => dispatch(checkEmailError(data)),
    showOtpErrorPopupAction:data=>dispatch(showOtpErrorPopupAction(data))
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(loadRepos());
    // },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);

