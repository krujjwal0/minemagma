/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

 import React, { useState, memo, useEffect } from 'react';

 import styled from 'styled-components';
 import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
 
 import HomePage from 'containers/HomePage/Loadable';
 import FeaturePage from 'containers/FeaturePage/Loadable';
 import SplashScreen from 'containers/LoginPage/index';
 import NotFoundPage from 'containers/NotFoundPage/Loadable';
 import { createBrowserHistory } from 'history';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 import { compose } from 'redux';
 import { createStructuredSelector } from 'reselect';
 import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
 import { useInjectReducer } from 'utils/injectReducer';
 import { useInjectSaga } from 'utils/injectSaga';
 import OtpPage from '../LoginPage/OtpPage';
 import EmpLogin from '../LoginPage/EmpLogin';
 import DashboardContent from './DashboardContent';
 import GlobalStyle from '../../global-styles';
 import { NavBar } from '../../components/NavBar/NavBar';
 import Dashboard from '../Dashboard/Loadable';
 import Regulatory from '../Regulatory';
 import Categories from '../Categories';
 import MyProfile from '../MyProfile/Loadable';
 import HelpPage from '../Help';
 import Listadd2 from '../ListAdd2/index';
 import Listadd from '../ListAdd/index';
 import Location from '../LoginPage/ChooseLocation';
 import Success from '../LoginPage/SuccessPage';
 import Users from '../Regulatory/Users';
 import FeedbackForm from '../LoginPage/FeedbackForm';
 import SecondFeedbackForm from '../FeedbackForm/FeedbackPage2';
 import Employee from '../Employee';
 import History from '../History';
 import LoginPage from '../LoginPage/LoginPage';
 
 import reducer from './reducer';
 import { setNavBar } from './actions';
 import { getUserLogout, setOtpAction, setShowOtpPage } from '../LoginPage/actions';
 import GeekStepper  from '../LoginPage/GeekStepper'
 import { DetailsPage } from '../Regulatory/DetailsPage';
 
 const key = 'main';
 
 export function App(props) {
   useInjectReducer({ key, reducer });
 
   const history = createBrowserHistory();
   const [nav, setNav] = useState(props.navBar);
   useEffect(() => {
     console.log('Nav bar ===', props.navBar);
     setNav(props.navBar);
   }, [props.navBar]);
 
   return (
     <>
       <div className="w-full h-full dis">
         <Router history={history}>
           {/* {nav ? (
             <NavBar
               setNavBar={props.setNavBar}
               setOtpAction={props.setOtpAction}
               signOut={props.signOut}
             />
           ) : null} */}
 
           <Switch>
             <Route exact path="/" component={SplashScreen} />
             <Route path="/login" component={LoginPage} />
             <Route path="/otp" component={OtpPage} />
                 <Route path="/stepper" component={GeekStepper}/>
 
                 <Route path="/success" component={Success} />
                 <Route path="/location" component={Location} />
                 <Route path="/form" component={FeedbackForm} />
             {/* {props.userIsAuthenticated == true ? */}
               <>
               <NavBar
               setNavBar={props.setNavBar}
               setOtpAction={props.setOtpAction}
               signOut={props.signOut}
             />
                 <Route path="/dashboard" component={Dashboard} />
                 <Route path="/categories" component={Categories} />
                 <Route path="/regulatory" component={Regulatory} />
                 <Route path="/help" component={HelpPage} />
                 <Route path="/features" component={FeaturePage} />
                 <Route path="/admin/users" component={Users} />
                 <Route path="/listadd" component={Listadd} />
                 <Route path="/listadd2" component={Listadd2} />
                 <Route path="/empLogin" component={EmpLogin} />
                 <Route path="/formsecond" component={SecondFeedbackForm} />
                 <Route path="/users" component={Employee} />
                 <Route path="/myprofile" component={MyProfile} />
                 <Route path="/history" component={History} /> 
                 <Route path="/regulatory/details" component={ DetailsPage } />
 
                </>
              {/* : */}
               <Route component={NotFoundPage} />
             {/* } */}
             <Route component={NotFoundPage} />
           </Switch>
         </Router>
       </div>
 
       <GlobalStyle />
     </>
   );
 }
 
 App.propTypes = {
   // addUser: PropTypes.func,
 };
 
 const mapStateToProps = state => ({
   navBar: state.main.navBar,
   userIsAuthenticated: state.loginReducer.userIsAuthenticated
 });
 
 export function mapDispatchToProps(dispatch) {
   return {
     setNavBar: data => dispatch(setNavBar(data)),
     setOtpAction: data => dispatch(setShowOtpPage(data)),
     signOut: () => dispatch(getUserLogout())
   };
 }
 
 const withConnect = connect(
   mapStateToProps,
   mapDispatchToProps,
 );
 
 export default compose(
   withConnect,
   memo,
 )(App);
 