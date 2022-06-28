import { TextField, Box, Button } from '@material-ui/core';
import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import camera from '../History/image/camera.png';
import close from '../History/image/close.png';
import { makeStyles } from '@material-ui/core/styles';
import reducer from './reducer';
import saga from './saga';
import { addUser, getAllDepartment, getAllRoles } from './actions';
import CloseIcon from '@material-ui/icons/Close';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const key = 'users';

export function AddUser(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    layout: {
      width: 1089,
      height: 1000,
    },
  }));
  const classes = useStyles();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [emailId, setEmailId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [roleId, setRoleId] = useState('');
  const insertUser = () => {
    // Add condition for blank
    const data = {
      roleId: roleId, // backend3
      name: name,
      mobileNumber: mobileNumber,
      emailId: emailId,
      departmentId: departmentId, // 1
      employeeId: employeeId,
    };
    props.addUser(data);
    setRoleId('');
    setName('');
    setMobileNumber('');
    setEmployeeId('');
    setEmailId('');
    setDepartmentId('');
    props.handleCloseBtn();
  };
  useEffect(() => {
    props.getAllDepartment();
    props.getAllRoles();
  }, []);

  const selectDepartmentId = e => {
    // console.log(value);
    setDepartmentId(e.target.value);
    // Call api to show users list of particular Location
  };
  const selectRoleId = e => {
    setRoleId(e.target.value);
  };

  return (
    <div className="">
      <div className="flex justify-between mt-6">
        <label
          style={{
            fontWeight: '500',
            fontSize: '22px',
            lineHeight: '1px',
          }}
          className="font-sans"
        >
          Add User
        </label>

        <div>
          <button className="" onClick={props.handleCloseBtn}>
            {' '}
            < CloseIcon style={{color: 'red', fontWeight: '600px'}} />
          </button>
        </div>
      </div>
      <br />
      <div className="flex mt-8">
        <div>
          {' '}
          <Box
            sx={{
              width: '110px',
              height: '100px',
              background: '#E5E7EB',
              borderRadius: '10px',
              transform: 'matrix(1, 0, 0, -1, 0, 0)',
            }}
          >
            <div className=' ml-11'><PhotoCameraIcon className='rotate' style={{marginTop: '44px', }} /></div>
          </Box>
        </div>
        <div className="-mt-6 ml-12">
          <div>
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="off"
              placeholder="Enter Here"
              id="outlined-basic"
              style={{
                width: '263px',
              }}
            />
          </div>
          <div>
            <TextField
              label="Employee ID"
              name="employeeId"
              value={employeeId}
              onChange={e => setEmployeeId(e.target.value)}
              autoComplete="off"
              placeholder="Enter Here"
              id="outlined-basic"
              style={{
                width: '263px',
              }}
            />
          </div>
          <div>
            <TextField
              label="Phone No"
              name="mobileNumber"
              value={mobileNumber}
              onChange={e => setMobileNumber(e.target.value)}
              autoComplete="off"
              placeholder="Enter Here"
              id="outlined-basic"
              style={{
                width: '263px',
              }}
            />
          </div>
          <div>
            <TextField
              label="Email Address"
              name="emailId"
              value={emailId}
              onChange={e => setEmailId(e.target.value)}
              autoComplete="off"
              placeholder="Enter Here"
              id="outlined-basic"
              style={{
                width: '263px',
              }}
            />
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Department
              </InputLabel>
              <MSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="departmentId"
                required={true}
                onClick={(e) => selectDepartmentId(e)}
                value={departmentId}
                style={{
                  width: '263px',
                }}
              >
                {props.departmentList.map((dept, index) => {
                  console.log("dept============", dept);
                  return (
                    <MenuItem key={index} name={dept.name} value={dept.id}>{dept.name}</MenuItem>
                  )
                })
                }
              </MSelect>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Role
              </InputLabel>
              <MSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="roleId"
                required={true}
                onClick={(e) => selectRoleId(e)}
                value={roleId}
                style={{
                  width: '263px',
                }}
              >
                {props.rolesList.map((role, index) => {
                  console.log("dept============", role);
                  return (
                    <MenuItem key={index} name={role.name} value={role.id}>{role.name}</MenuItem>
                  )
                })
                }
              </MSelect>
            </FormControl>
          </div>

          <div className="mt-4">
            <Button
              onClick={() => insertUser()}
              style={{
                position: 'absolute',
                width: '155px',
                height: '40px',
                background: '#98E91D',
                borderRadius: '60px',
              }}
            >
              <p className='font-sans -ml-3 text-white'>Save</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

AddUser.propTypes = {
  addUser: PropTypes.func,
};

const mapStateToProps = state => ({
  departmentList: state.users.departmentList.length > 0 ? state.users.departmentList : [],
  rolesList: state.users.rolesList.length > 0 ? state.users.rolesList : []

});

export function mapDispatchToProps(dispatch) {
  return {
    addUser: data => dispatch(addUser(data)),
    getAllDepartment: () => dispatch(getAllDepartment()),
    getAllRoles: () => dispatch(getAllRoles()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddUser);
