/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';

import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import LoginPage from 'containers/LoginPage/index';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage2 from '../LoginPage/LoginPage';
import OtpPage from '../LoginPage/OtpPage';
import GlobalStyle from '../../global-styles';
import { NavBar } from '../../components/NavBar/NavBar';
import Dashboard from '../Dashboard/Loadable';
import Regulatory from '../Regulatory';
import Categories from '../Categories';
import MyProfile from '../MyProfile/index';
import History from '../History';
import Help from '../Help';
import history from '../../utils/history';
// const AppWrapper = styled.div`
//   max-width: calc(768px + 16px * 2);
//   margin: 0 auto;
//   display: flex;
//   min-height: 100%;
//   padding: 0 16px;
//   flex-direction: column;
// `;

export default function Dashboardcontents() {
  // useEffect(()=>{
  //   console.log("msg")
  //   history.push({
  //     pathname: '/dashboard'
  //   })
  // },[])
  return (
    <>
      <div className="w-full h-full">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/categories" component={Categories} />
            <Route path="/regulatory" component={Regulatory} />
            <Route path="/features" component={FeaturePage} />
            <Route path="/myprofile" component={MyProfile} />
            <Route path="/history" component={History} />
            <Route path="/help" component={Help} />
            {/* <Route path="/LoginPage" component={LoginPage} />
            <Route path="/LoginPage2" component={LoginPage2} />
            <Route path="/OtpPage" component={OtpPage} /> */}
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Router>
      </div>

      <GlobalStyle />
    </>
  );
}
