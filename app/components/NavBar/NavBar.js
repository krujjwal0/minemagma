import React, { useState, memo } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './NavBar.css';
import { IconContext } from 'react-icons';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import nav from './Image/navTop.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { getUserLogout } from './action';
import navImage from './Image/dashboard.svg';
import logo from '../../images/logo.svg';
import { SidebarData } from './SidebarData';
import Badge from '@material-ui/core/Badge';
import reducer from './reducer';
import saga from './saga';
import { setOtpAction } from '../../containers/LoginPage/actions';
const key = 'navReducer';

export function NavBar({ setNavBar, getUserLogout, setOtpAction, signOut }) {
  const history = useHistory();

  const routeChange = () => {
    const path = `/myprofile`;
    history.push(path);
  };

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const userLogout = () => {
    console.log('Logging out');
    signOut();
    const path = `/`;
    history.push(path);
    setNavBar(false);
    // setOtpAction(false);
  };
  return (
    <>
      <IconContext.Provider value={{ color: '#F66B6B' }}>
        <div>
          <div>
            <div className="navbar  w-full font-sans">
              {/* <Link to="#" className='menu-bars'> */}
              {/* <p onClick={showSidebar} >
                    </p> */}
              {/* <img src={logo} style={{ width: '180px', height: '60px' }} />
                    </Link> */}
            </div>
            <div className="flex justify-end mr-6 mb-6 -mt-6">
              <Badge badgeContent={4} color="primary">
                <NotificationsNoneIcon color="action" />
              </Badge>
            </div>
          </div>

          <nav style={{}} className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            {/* <div className='nav-menu-items '>
                        <Link to="#" >
                            <img src={logo} style={{ width: '180px', height: '60px' }} />
                        </Link>
                    </div> */}

            <ul className="nav-menu-items font-sans ">
            <li className="navbar-toggle font-sans mb-1 mt-8">
                <Link to="#" className="menu-bars   font-sans">
                <div className='-mt-3 -ml-6 mb-4'>
                <img src={nav}  />
                </div>
                  <img src={logo} style={{ width: '160px', height: '50px', marginLeft: '-3px' }} />
                </Link>
              </li>

              {SidebarData.map((item, index) => (
                <li key={index} className={item.cName}>
                  <Link className="font-sans" to={item.path}>
                    {item.icons}
                    <span className="font-sans">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* <div className='mt-12  flex justify-end' style={{float: "right"}}>
        <div>
          <NotificationsNoneIcon />
          </div></div> */}

            <div
              className=" font-sans fixed "
              style={{
                // top: '425px',
                height: '180px',
                width: '210px',
                // right: '13px',
                
                bottom: '0',
                left: '0',
              }}
            >
              <img src={navImage} />

              <div
                className=" absolute -mt-40 bg-white rounded-full w-36  h-12 font-sans "
                style={{
                  marginLeft: '10px',
                  alignSelf: 'center',
                  alignContent: 'center',
                  justifyItems: 'center',
                }}
              >
                <div className="flex">
                  <div
                    className=" mt-3 h-[30px] w-[30px] ml-3 bg-[#132B6B]"
                    style={{ borderRadius: '40px' }}
                    onClick={routeChange}
                  >
                    <p className="text-white ml-[6px] mt-[7px] font-sans">RK</p>
                  </div>
                  <Button
                    className=" font-sans "
                    style={{
                      color: '#132B6B',
                      alignContent: 'center',
                      justifyItems: 'center',
                    }}
                    onClick={routeChange}
                  >
                    <p
                      className="font-sans font-normal text-sm -ml-4 "
                      style={{ marginTop: '5px' }}
                    >
                      My Profile
                    </p>
                  </Button>
                </div>
                <div className="-mt-10 rounded-full h-[45px] w-[49px] ml-40 bg-[#fff]">
                  <PowerSettingsNewIcon
                    className="mt-2 ml-3"
                    onClick={() => userLogout()}
                  />
                </div>
                <div className=" font-sans ">
                  <p
                    className="font-sans font-semibold text-sm ml-2  mt-1"
                    style={{ color: '#fff' }}
                  >
                    © minemagma 2020.
                    <br />
                    <span
                      className="font-sans font-normal "
                      style={{ color: '#fff' }}
                    >
                      {' '}
                      All Rights Reserved
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
}

NavBar.propTypes = {
  // otp: PropTypes.string,
  getUserLogout: PropTypes.func,
};

const mapStateToProps = state => ({
  // otp: state.loginReducer.otp
});

export function mapDispatchToProps(dispatch) {
  return {
    getUserLogout: () => dispatch(getUserLogout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NavBar);
