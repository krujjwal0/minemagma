import React, { useState } from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { InputBase ,TextField} from '@material-ui/core';

import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAllDepartment, getAllRoles, setEmployee } from './actions';
import AddUser from './AddUser';

const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export function UsersUtility({
  rolesList,
  departmentList,
  getAllDepartment,
  getAllRoles,
}) {
  const [showExport, setShowExport] = useState(false);
  const openExport = () => {
    setShowExport(true);
  };
  const handleExit = () => {
    setShowExport(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [name, setName] = useState('');
  const filterEmployee = e => {
    const keyword = e.target.value;
    const obj = {
      fromSaga: false,
      results: [],
    };

    if (keyword !== '') {
      const results = EmployeeCardListreplica.filter(list => list.name.toLowerCase().startsWith(keyword.toLowerCase()));
      // setFoundUsers(results);
      console.log('show result inside filter', results);
      obj.results = results;
      setEmployee(obj);
    } else {
      obj.results = EmployeeCardListreplica;
      // setFoundUsers(employeeCardList);
      setEmployee(obj);
    }

    setName(keyword);
  };
  return (
    <div className="flex font-sans">
      <select
        className="border-2 border-gray-200 bg-white h-9 px-3 pr-2 ml-6 rounded-full text-sm focus:outline-none"
        style={{ width: '10%' }}
        // onChange={() => orderBy()}
      >
        <option value="" disabled selected>
          Sort by
        </option>
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>
      </select>
      {/* <input
        className="border-0 border-gray-200 bg-white h-8 px-4 pr-4 ml-1 rounded text-sm focus:outline-none"
        style={{ width: '10%', borderRadius: '8px' }}
        type="search"
        name="filter"
        placeholder="Filter"
      /> */}
      <label
        className="border-0 font-sans border-gray-200 bg-white h-9 mt-1 px-2 ml-2  text-sm"
        style={{ width: '8%' }}
      >
        Search By
      </label>
      <select
        className="border-2 border-gray-200 font-sans bg-white h-9 px-2 pr-2 ml-1 rounded-full text-sm focus:outline-none"
        style={{ width: '14%' }}
        // onChange={() => orderBy()}
      >
        <option className="font-sans" value="" disabled selected>
          Department
        </option>
        <option className="font-sans" value="1">
          Marketing
        </option>
        <option className="font-sans" value="2">
          Account
        </option>
        <option className="font-sans" value="3">
          IT
        </option>
        <option className="font-sans" value="4">
          HR
        </option>
      </select>

      <input
        className="border-2 border-gray-300 bg-white w-2/5 h-9 px-8 pr-6 ml-3 rounded-full text-sm focus:outline-none"
        value={name}
        onChange={filterEmployee}
        style={{}}
        type="text"
        name="search"
        placeholder="Search by phone, email"
      />
      <button className="text-red-400 border-2 rounded-full border-gray-300 mr-3 ml-3 w-16 h-9 pr-2 pl-1">
        Clear
      </button>
      <div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<MoreVertIcon />}
          style={{
            color: 'white',
            borderRadius: '30px',
            background: 'rgba(102, 115, 126, 0.46)',
          }}
        >
          ACTION
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
        <div className="p-2 m-2">
          <div>
            <button className="text-slate-200 mx-3" disable>
              Import Excel
            </button>
          </div>
          <div>
            <button className="text-slate-200 mx-3 my-2" disable>
              Import SAP
            </button>
          </div>
          <div>
            <button className="mx-3" onClick={openExport}>
              Add User
            </button>
          </div>
        </div>
      </Popover>
      <Dialog open={showExport} onClose={handleExit} className="w-30 h-25">
        <DialogContent
          style={{
            borderRadius: '15px',
            background: '#FFFFFF',
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)',
            Width: '604px',
            Height: '494px',
          }}
        >
          <AddUser
            rolesList={rolesList}
            departmentList={departmentList}
            getAllDepartment={getAllDepartment}
            getAllRoles={getAllRoles}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
const mapDispatchToProps = dispatch => ({
  showEmployee: obj => dispatch(showEmployee(obj)),
  setEmployee: obj => dispatch(setEmployee(obj)),
  getAllRoles: () => dispatch(getAllRoles()),
  getAllDepartment: () => dispatch(getAllDepartment()),
});

const mapStateToProps = state => {
  console.log('index of EmployeeList', state.emp.EmployeeCardList);
  return {
    EmployeeCardList: state.emp.EmployeeCardList,
    rolesList: state.users.rolesList.length > 0 ? state.users.rolesList : [],
    departmentList:
      state.users.departmentList.length > 0 ? state.users.departmentList : [],
    EmployeeCardListreplica: state.emp.EmployeeCardListreplica,
  };
};
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default UsersUtility;
