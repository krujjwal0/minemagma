import React from 'react';
import LoginFirstImage from './images/image1.png';
import LoginSecondImage from './images/Login2.svg';
import LoginThirdImage from './images/Login3.svg';
import LoginImage from './images/Logo.svg';
import Resend from './images/resendImage.svg';
import './style.css';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function Login() {
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
            <h1 className="text-center font-bold font-sans text-3xl mb-8 text_blue">
              Login
            </h1>
            <div className="form_box pt-8 w-full">
              <TextField
                error
                name="email"
                type="email"
                id="standard-error-helper-text"
                placeholder="Enter Your Username"
                // helperText="Error message."
                variant="standard"
                style={{ width: '100%', color: '#6E7B8B', fontSize: '16px' }}
              />
              <p className="text-right mb-5 mt-2 font-sans text-red-500">
                Error Message
              </p>
              <TextField
                name="password"
                type="password"
                placeholder="***"
                style={{
                  width: '100%',
                  color: '#6E7B8B',
                  fontSize: '20px',
                  marginBottom: '30px',
                }}
              />
              <p
                className="text_red text-center my-4 font-sans font-medium"
                style={{ fontSize: '14px' }}
              >
                Invalid username and password
              </p>
              <Button className="bg_red mx-auto  font-bold login_btn  w-60 rounded-3xl my-5">
                Login
              </Button>

              <p
                className="text-center mt-7 font-medium"
                style={{ fontSize: '14px', color: '#124D50' }}
              >
                <Link href="#" className="font-sans">
                  Forgot Your password?
                </Link>
              </p>
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
    </div>
  );
}
