import React, { useState, useEffect } from 'react';
import logoIcon from './images/logo.svg';
import backgroundImage from './images/splashScreen.png';
import logo from './images/logoSplash.png';
import Login from './LoginPage';
import './style.css';


export default function SplashScreen() {
  const [showView, setShowView] = useState();
  const [a, setA] = useState(true);
  useEffect(() => {
    setTimeout(splash, 3000);
  }, []);
  const splash = () => {
    setA(false);
  };

  return a ? (
    <div>
      <div className=" fixed bg-white w-full">
        <div className="pt-5 ">
          <div>
            <img className=" ml-14" src={logo} />
          </div>
        </div>
        <div>
        <div className="container relative z-10">
        <div className="flex justify-start flex-wrap h-full mt-7 min-h-full items-center"
        style={{paddingLeft: '300px'}}
        >
          <div className="card mt-12 bg-white shadow-lg rounded-3xl  py-7 px-10 max-w-xl w-3/5">
          <div className="msg_box  flex flex-wrap pt-5">
          <div className="w-full lg:-mt-5 ml-4 item-center quote_box md:text-3xl text-xl font-bold">
            <h3 className="text_blue font-sans">Smart Platform for</h3>
            <h3 className="text_red  font-sans">Smart People</h3>
          </div>
          </div>
          </div>
          </div>
          </div>
          <img
            className="  w-full h-screen lg:-mt-80 md:-mt-72 "
            src={backgroundImage}
            //  style={{ marginTop: '-24.30%' }}
            
          />
          
        </div>
      </div>
    </div>
  ) : (
    <Login />
  );
}
