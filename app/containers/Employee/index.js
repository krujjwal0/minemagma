/*
 * Regulatory
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, CardContent, Typography, Divider, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CardActions from '@material-ui/core/CardActions';
import Popover from '@material-ui/core/Popover';
import Switch from '@material-ui/core/Switch';
import MoreVert from '@material-ui/icons/MoreVert';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { alpha, styled, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { EditUser } from './EditUser';
import {
  deleteUser,
  editUser,
  showEmployee,
  changeUsername,
  getAllDepartment,
  getAllRoles,
  setEmployee,
  addUser,
  setEditUserData,
} from './actions';
import { loadRepos } from '../App/actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Users from './Users';
import { AddUser } from './AddUser';
//import UsersUtility from './UsersUtility';
import emp_image from '../../images/emp_image.png';
import { lastIndexOf } from 'lodash';
import './style.css';
import userImage from '../LoginPage/images/addImage.png';

const key = 'users';



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

export function Employee({
  username,
  usersList,
  usersListreplica,
  deleteUser,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
  showEmployee,
  editUser,
  rolesList,
  departmentList,
  getAllDepartment,
  getAllRoles,
  setEmployee,
  addUser,
  setEditUserData,
  editUserData
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  useEffect(() => {
    showEmployee();
    getAllDepartment();
    console.log('USers List index =====', usersList);
  }, []);

  useEffect(() => {
    console.log("editUserData =====", editUserData)
  }, [editUserData]);

  useEffect(() => {
    console.log('department list', departmentList);
  }, [departmentList]);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchor, setAnchor] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [deleteId, setDeleteId] = useState(0);

  const handleClickAdd = (event, index) => {
    console.log("================", index)
    setEditUserData(usersList[index]);
    setDeleteId(index);
    setAnchor(event.currentTarget);
  };

  const handleCloseAdd = () => {
    setAnchor(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const openAdd = Boolean(anchor);
  const idAdd = openAdd ? 'simple-popover' : undefined;

  // const [editUserData, setEditUserData] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const openEdit = () => {
    setShowEdit(true);
    handleCloseAdd();
  };
  const handleExit = () => {
    setShowEdit(false);
  };

  useEffect(() => { }, [usersList]);
  const onDeleteUser = () => {
    // const verify = window.confirm('Are you sure you want to delete ?');
    // console.log('Verify====id ', verify, id);
    // if (verify == true) {
    //   console.log('Inside true');
    // pass id to delete
    console.log("onDeleteUser===", deleteId);
    deleteUser(usersList[deleteId].id);
    // }
  };

  const [showExport, setShowExport] = useState(false);
  const openExport = () => {
    setShowExport(true);
    handleClose();
  };
  const handleCloseBtn = () => {
    setShowExport(false);
  };

  const [name, setName] = useState('');

  const filter = e => {
    const keyword = e.target.value;
    // setName(searchBy);
    console.log("Seacrh according to ====", searchBy, name, keyword.length)
    let obj = {
      fromSaga: false,
      results: [],
    };

    if (keyword !== '' && keyword.length > 1) {
      if (searchBy === 'name' && keyword.length > 2) {
        const results = usersListreplica.filter((list) => {
          return list.name.toLowerCase().startsWith(keyword.toLowerCase());
        });
        // setFoundUsers(results);
        console.log('show result name inside filter', results);
        obj.results = results;
        setEmployee(obj);
      }
      else if (searchBy === 'departmentName') {
        const results = usersListreplica.filter((list) => {
          return list.departmentName.toLowerCase().startsWith(keyword.toLowerCase());
        });
        // setFoundUsers(results);
        console.log('show result department inside filter', results);
        obj.results = results;
        setEmployee(obj);
      }
      else if (searchBy === 'emailId' && keyword.length > 2) {
        const results = usersListreplica.filter((list) => {
          return list.emailId.toLowerCase().startsWith(keyword.toLowerCase());
        });
        // setFoundUsers(results);
        console.log('show result emailID inside filter', results);
        obj.results = results;
        setEmployee(obj);
      } else {
        obj.results = usersListreplica;
        // setFoundUsers(usersList);
        setEmployee(obj);
      }
    } else {
      obj.results = usersListreplica;
      // setFoundUsers(usersList);
      setEmployee(obj);
    }
    setName(keyword);
  };

  const [searchBy, setSearchBy] = useState('name');

  let sortBy = 'name';
 
  const searchByOptions = [
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Department',
      value: 'departmentName'
    },
    {
      label: 'Email',
      value: 'emailId'
    }
  ]

  const handleSelectSeachByOption = (e) => {
    // setName(e.target.value)

    setSearchBy(e.target.value);
    console.log("Search By ===== ", e.target.value, searchBy)
  }

  const clearAll = () => {
    console.log("clear All ===", usersList, usersListreplica)
    // const v = {
    //   target:{
    //     value:'name'
    //   }
    // }

    // handleSelectSeachByOption(v);

    setName('');
    let obj1 = {
      fromSaga: false,
      results: [],
    };
    obj1.results = usersListreplica;
    // setFoundUsers(usersList);
    setEmployee(obj1);
  }

  useEffect(() => {

  }, [name])

  const orderBy = (e) => {
    sortBy = e.target.value;
    console.log("orderBy .................... ", sortBy);

    console.log("Sortong according to ====", sortBy)
    let obj = {
      fromSaga: false,
      results: []
    };

    if (sortBy === 'name') {
      const results = usersList.sort((a, b) => a.name > b.name ? 1 : -1
      );
      console.log('SORTING result name inside filter', results);
      obj.results = results;
      setEmployee(obj);
    }
    else if (sortBy === 'employeeId') {
      const results = usersList.sort((a, b) => a.employeeId > b.employeeId ? 1 : -1);
      console.log('SORTING Id inside filter', results);
      obj.results = results;
      setEmployee(obj);
    }
    else if (sortBy === 'emailId') {
      const results = usersList.sort((a, b) => a.emailId > b.emailId ? 1 : -1);
      console.log('SORTING EmailId inside filter', results);
      obj.results = results;
      setEmployee(obj);
    }
    else if (sortBy === 'departmentName') {
      const results = usersList.sort((a, b) => a.departmentName > b.departmentName ? 1 : -1);
      console.log('SORTING department inside filter', results);
      obj.results = results;
      setEmployee(obj);
    } else {
      console.log(" ELSE In SORTING ", usersList, usersListreplica)

      obj.results = usersListreplica;
      setEmployee(obj);
    }

  }

  return (
    <div className="content">

      <div className="mx-9 mt-4 w-[95%]">
        <Breadcrumbs
          aria-label="breadcrumb"
          className="font-sans font-bold text-xl"
          style={{ marginLeft: '0px', fontWeight: '800', fontSize: '30px' }}
        >
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
            className="font-sans font-bold text-xl"
            style={{
              marginLeft: '30px',
              fontWeight: '500',
              fontSize: '25px',
              color: '#132B6B',
            }}
          >
            <ClearAllIcon sx={{ mr: 0.8 }} fontSize="inherit" />
            List
          </Typography>
        </Breadcrumbs>
        <p
          style={{ color: '#F66B6B', fontSize: '11px' }}
          className=" font-sans ml-14"
        >
          Dashboard |
          <span className=" font-sans ml-2" style={{ color: '#151F63' }}>
            List{' '}
          </span>
        </p>
        <div className="mt-4 mb-6 w-full">
          <Divider />
        </div>
        <div className="flex justify-between font-sans">
          <select
            className="border-2 border-gray-200 bg-white h-9 px-3 pr-2 rounded-full ml-8 text-sm focus:outline-none"
            style={{ width: '13%' }}
            onChange={(e) => orderBy(e)}
          >
            <option value="" disabled selected className='font-sans'>
              Sort by
            </option>
            <option className='font-sans' value="name" name="name">Name</option>
            <option className='font-sans' value="emailId" name="emailId">Email ID</option>
            <option className='font-sans' value="employeeId" name="id">Employee ID</option>
            <option className='font-sans' value="departmentName" name="departmentName">Department</option>
          </select>
          <div className='flex'>
            <label
              className="border-0 border-gray-200 bg-white h-9 mt-2 px-2 ml-2 rounded-full text-sm font-sans"
            // style={{ width: '12%', borderRadius: '8px' }}
            >
              Search By
            </label>
            <select
              className="border-2 border-gray-200 bg-white h-9 px-2 pr-2 ml-1 rounded-full font-sans text-sm focus:outline-none"
              style={{ width: '150px' }}
              // onClick={selectDepartment}
              onClick={handleSelectSeachByOption}
            // value={name}
            >
              {/* <option value="" disabled selected>
              Name
            </option> */}
              {searchByOptions.map((data, index) => {
                return (
                  <option className='font-sans' key={index} value={data.value}>
                    {data.label}
                  </option>
                );
              })}
            </select>
          </div>

          <input
            className="border-2 border-gray-300 bg-white h-9 px-8 pr-6 ml-3 rounded-full text-sm focus:outline-none"
            value={name}
            onChange={filter}
            style={{ width: '390px' }}
            type="text"
            name="search"
            placeholder="Search Here"
          />
          <button className="text-green-400 border-2 rounded-full border-gray-300 mr-3 ml-3 w-16 h-9 pr-2 pl-1" onClick={() => clearAll()}>
            Clear
          </button>
          <div className='font-sans w-40'>
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<MoreVert />}
              style={{
                color: 'white',
                borderRadius: '30px',
                background: 'rgba(102, 115, 126, 0.46)',
              }}
              className="font-sans"
            >
              <p className='font-sans '>ACTION</p>
            </Button>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            style={{
              borderRadius: '15px',
              // background: '#FFFFFF',
              // boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <div className="p-2 m-2 font-sans">
              <div>
                <button className="text-slate-200 mx-3 font-sans" disable>
                  Import Excel
                </button>
              </div>
              <div>
                <button className="text-slate-200 mx-3 my-2 font-sans" disable>
                  Import SAP
                </button>
              </div>
              <div>
                <button className="mx-3 font-sans" onClick={openExport}>
                  Add User
                </button>
              </div>
            </div>
          </Popover>
          <Dialog className='w-full h-full' open={showExport} onClose={handleCloseBtn}>
            <DialogContent
            // style={{
            //   borderRadius: '15px',
            //   background: '#FFFFFF',
            //   boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
            //   Width: '70%',
            //   Height: '80%',
            // }}
            >
              <AddUser
                addUser={addUser}
                rolesList={rolesList}
                departmentList={departmentList}
                getAllDepartment={getAllDepartment}
                getAllRoles={getAllRoles}
                handleCloseBtn={handleCloseBtn}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="">
          <div className=" w-full">
            {/* gap-x-1 */}

            {usersList &&
              usersList.length > 0 &&
              usersList.map((list, index) => {
                return (
                  <div
                    className="block text-gray lg:ml-6 md:ml-10 sm:ml-12"
                    key={index}
                  // style={{border:'2px solid red', marginLeft:'6px',marginRight:'6px'}}
                  >
                    <div className="my-5 w-full justify-center " />
                    <div>
                      <Card
                        className="w-full rounded-full h-[72px]"
                        style={{ borderRadius: '50px', marginTop: '10px' }}
                      >
                        <CardContent className="justify-center">
                          <div className="flex justify-between rounded-full" key={list.name}>
                            <div className='flex'>
                              <div className="">
                                <img
                                  className="rounded-full ml-3 w-[41px] h-[41px]"
                                  src={userImage}
                                />
                              </div>
                              <div className="ml-6">
                                <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                                  Employee
                                </p>
                                <div className="flex">
                                  <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                                    {list.name}
                                  </p>
                                  <div className="flex justify-center w-20 bg-[#F66B6B] ml-1 mt-[6px] rounded-md h-4">
                                    <p className="text-center m-2 text-[11px] mt-[2px] text-white font-sans">
                                      {list.employeeId}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="ml-10">
                              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                                Department
                              </p>
                              <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                                {list.departmentName}
                              </p>
                            </div>
                            <div className="ml-12">
                              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                                Phone
                              </p>
                              <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                                {list.mobileNumber}
                              </p>
                            </div>
                            <div className="ml-12 w-48">
                              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                                Email ID
                              </p>
                              <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                                {list.emailId}
                              </p>
                            </div>
                            <div className="ml-12">
                              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                                Active
                              </p>
                              {/* <FormControlLabel
control={<IOSSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" />}

/> */}
                              <GreenSwitch {...label} defaultChecked className='-ml-3' />
                            </div>
                            <div className="mt-2 mr-16">
                              <MoreVert onClick={(e) => handleClickAdd(e, index)} />
                            </div>
                            <Popover
                              id={idAdd}
                              open={openAdd}
                              anchorEl={anchor}
                              onClose={handleCloseAdd}
                              style={{
                                borderRadius: '15px',
                                // background: '#FFFFFF',
                                // boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'
                              }}
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                            >
                              <div className="p-2 m-2">
                                <div>
                                  <button
                                    className="my-1 mx-4 font-sans"
                                    value={list.id}
                                    onClick={() => openEdit()}
                                  >
                                    Edit
                                  </button>
                                </div>
                                <div>
                                  <button
                                    className="my-1 mx-4 font-sans"
                                    value={list.id}
                                    onClick={() => onDeleteUser()}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </Popover>
                            <Dialog
                              open={showEdit}
                              onClose={handleExit}
                              className="w-50 h-50"
                            >
                              <DialogContent
                                style={{
                                  borderRadius: '15px',
                                  background: '#FFFFFF',
                                  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
                                  Width: '604px',
                                  Height: '494px',
                                }}
                              >
                                <EditUser
                                  list={editUserData}
                                  editUser={editUser}
                                  rolesList={rolesList}
                                  departmentList={departmentList}
                                  getAllDepartment={getAllDepartment}
                                  getAllRoles={getAllRoles}
                                  handleExit={handleExit}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                        <CardActions>
                          {/* <Button size="small">Learn More</Button> */}
                        </CardActions>
                      </Card>
                      {/* ))
                  ) : (
                    <h1>No results found!</h1>
                  )} */}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        {/* <label className="users_heading">Users</label> */}
      </div>
      {/* <div className="flex mt-4 justify-center">
        <div className="w-[65%] h-screen bg-white rounded-t-[50px] align-center">
          <div className="mt-8">
            <UsersUtility showEmployee={showEmployee}/>
          </div>
          <div className="">
            <Users />
            {/* <Users />
            <Users /> */}
    </div>
  );
}

Employee.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = state => ({
  usersList: state.users.usersList.length > 0 ? state.users.usersList : [],
  usersListreplica: state.users.usersListreplica.length > 0 ? state.users.usersListreplica : [],
  rolesList: state.users.rolesList.length > 0 ? state.users.rolesList : [],
  departmentList: state.users.departmentList.length > 0 ? state.users.departmentList : [],
  editUserData: state.users.editUserData,
});

export function mapDispatchToProps(dispatch) {
  return {
    showEmployee: data => dispatch(showEmployee(data)),
    setEmployee: data => dispatch(setEmployee(data)),
    editUser: data => dispatch(editUser(data)),
    deleteUser: data => dispatch(deleteUser(data)),
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    getAllDepartment: () => dispatch(getAllDepartment()),
    getAllRoles: () => dispatch(getAllRoles()),
    addUser: data => dispatch(addUser(data)),
    setEditUserData: data => dispatch(setEditUserData(data)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };

  // const mapStateToProps = createStructuredSelector({
  //   repos: makeSelectRepos(),
  //   username: makeSelectUsername(),
  //   loading: makeSelectLoading(),
  //   error: makeSelectError(),
  // });
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Employee);
