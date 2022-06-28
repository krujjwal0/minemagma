import React from 'react';
// import 'react-virtualized/styles.css';
// import {Column, Table} from 'react-virtualized';
// import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
// import List from 'react-virtualized/dist/commonjs/List';
// import { List } from "react-virtualized";
import { withStyles } from '@material-ui/core/styles';
import './style.css';
import { List, AutoSizer } from 'react-virtualized';
import { alpha, styled } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import { Card, CardContent } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import emp_image from '../../images/emp_image.png';

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => (
  <Switch
    focusVisibleClassName={classes.focusVisible}
    disableRipple
    classes={{
      root: classes.root,
      switchBase: classes.switchBase,
      thumb: classes.thumb,
      track: classes.track,
      checked: classes.checked,
    }}
    {...props}
  />
));

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

// List data as an array of strings
const list = [
  { name: 'Brian Vaughn', id: 1 },
  { name: 'Brian Vaughn', id: 1 },
  { name: 'Brian Vaughn', id: 1 },
  // 'heena',
  // 'atulniya'
  // And so on...
];

function rowRenderer({
  key, // Unique key within array of rows
  index, // Index of row within collection
  isScrolling, // The List is currently being scrolled
  isVisible, // This row is visible within the List (eg it is not an overscanned row)
  style, // Style object to be applied to row (to position it)
}) {
  // const viewRegulatory = (data) => {
  //   // onChangedEditData(data);

  //   history.push({
  //     pathname: "/regulatory"
  //   });

  // }
  console.log('List ::::', list, key, index);
  return (
    <div key={key} style={style} className="row">
      <div>
        <img className="empImg" src={emp_image} alt="user image" />
      </div>
      <div className="content">
        <label>Employee</label>
        <p>{list[index].name}</p>
      </div>
      <div className="content">
        <label> {/*  Id */} </label>
        <p>{/* {list[index].id} */}</p>
      </div>
      <div className="content">
        <label> Department </label>
        <p>{/* {list[index].department} */}hr</p>
      </div>
      <div className="content">
        <label> Phone </label>
        <p>
          9876543210
          {/* {list[index].id} */}
        </p>
      </div>
      <div className="content">
        <label> Phone </label>
        <p>
          9876543210
          {/* {list[index].id} */}
        </p>
      </div>
      <div className="content">
        <label>Active</label>
        <p>
          <GreenSwitch {...label} defaultChecked />
          {/* {list[index].id} */}
        </p>
      </div>
    </div>
  );
}

export default function Users() {
  const [state, setState] = React.useState({
    checked: true,
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <>
      {/* <div />
      <div className="list">
        <List
          width={900}
          height={600}
          rowCount={list.length}
          rowHeight={50}
          rowRenderer={rowRenderer}
        />
      </div> */}
      {/* {list.map((emp, index) => {} )} */}
      <Card className="w-full h-[72px] mt-[10px]">
        <CardContent>
          <div className="flex">
            <div className="rounded-full h-[41px] w-[41px] ml-3 bg-[#132B6B]">
              <p className="text-white ml-[11px] mt-[11px] font-sans">RK</p>
            </div>
            <div className="ml-10">
              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                Department
              </p>
              <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                Mining
              </p>
            </div>
            <div className="ml-10">
              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                Assign Person
              </p>
              <div className="flex">
                <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                  Rajat Kapoor
                </p>
                <div className="flex justify-center w-20 bg-[#F66B6B] ml-1 mt-[6px] rounded-md h-4">
                  <p className="text-center text-[11px] mt-[2px] text-white font-sans">
                    #0123456789
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-16">
              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                Reviewer
              </p>
              <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                Abhinandan Banerjee
              </p>
            </div>
            <div className="ml-12">
              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                Lead Reviewer
              </p>
              <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                Rupesh Bansal
              </p>
            </div>
            <div className="ml-12">
              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                Category
              </p>
              <p className="text-[13px] font-sans font-bold text-[#132B6B] mt-[8px]">
                OTC
              </p>
            </div>
            <div className="ml-12">
              <p className="text-[11px] font-sans font-semibold text-[#66737E] mt-[2px]">
                Category
              </p>
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={state.checked}
                    onChange={handleChange}
                    name="checkedB"
                  />
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
