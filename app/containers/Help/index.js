/*
 * Help
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, useState, memo } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import { Card, CardContent, FormGroup, Typography, Divider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import saga from './saga';
import reducer from './reducer';
import { getQ_A, setQ_A } from './action';

const key = 'helpReducer';

function Help(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.getQ_A();
    console.log('Help Questions and Answers ', props.help_Q_A);
  }, []);

  useEffect(() => {
    console.log('Help UseEffect ', props.help_Q_A, props.helpreplica);
  }, [props.help_Q_A]);

  useEffect(() => {
    console.log('Help UseEffect ', props.help_Q_A, props.helpreplica);
  }, [props.helpreplica]);

  const [question, setQuestion] = useState()

  const filter = (e) => {
    const keyword = e.target.value;
    let obj = {
      fromSaga: false,
      results: [],
    }
    if (keyword !== '' && keyword.length > 2) {
      const results = props.helpreplica.filter((que) => {
        // return que.question.toLowerCase().startsWith(keyword.toLowerCase());
        return que.question.toLowerCase().includes(keyword.toLowerCase())
      });
      console.log('help replica target value', props.helpreplica, props.help_Q_A, e.target.value, results)
      obj.results = results;
      props.setQ_A(obj);
    }
    else {
      obj.results = props.helpreplica;
      props.setQ_A(obj);
    }
    setQuestion(keyword);
  };
  return (
    <div className="content">
      <div className="mx-9 mt-4  w-[95%] h-full">
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
            Help
          </Typography>
        </Breadcrumbs>
        <p
          style={{ color: '#F66B6B', fontSize: '11px' }}
          className=" font-sans ml-14"
        >
          Dashboard |{' '}
          <span className=" font-sans" style={{ color: '#151F63' }}>
            Help{' '}
          </span>
        </p>
        <div className="mt-4 w-full">
          <Divider />
        </div>

        <p
          className=" font- sans font-bold flex justify-center text-xl mt-9"
          style={{ color: '#F66B6B' }}
        >
          <p className="font-sans">
            Hope you can find frequently asked questions. We help you to find
            the answer !
          </p>
        </p>
        <div className="flex rounded-full">
          <div className="mt-10 absolute ml-5 ">
            <SearchIcon />
          </div>
          <input
            className=" mt-7 border-2 border-gray-300 bg-white w-full h-12 px-16 rounded-full font-sans text-sm focus:outline-none"
            style={{}}
            value={question}
            onChange={filter}
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>

        <div className="mt-7">
          {props.help_Q_A.length > 0 ? (
            props.help_Q_A.map((ques, i) => (
              <Accordion
                key={i}
                className="w-full"
                style={{ border: '1px solid #DCE1EA', borderRadius: '10px', marginTop: '30px' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="mt-8 text-[#132B6B]" style={{
                    marginTop: '7px',
                    color: '#132B6B',
                    fontWeight: '500',
                    fontSize: '18px',
                  }}>
                    {ques.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{ques.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <p>No Result Found</p>
          )}
        </div>
        <div className="mt-32 flex justify-center mb-12">
          <Button
            className="bg_red mx-auto  font-bold login_btn  w-60 h-14 rounded-full my-5 "
            style={{ borderRadius: '50px' }}
            onClick={e => login(e)}
          >
            <p
              className="font-sans font-bold text-lg"
              style={{ color: '#fff' }}
            >
              Contact Us
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}

Help.propTypes = {
  // help_Q_A: PropTypes.string,
  getQ_A: PropTypes.func,
};

const mapStateToProps = state => ({
  help_Q_A: state.helpReducer.help_Q_A.length > 0 ? state.helpReducer.help_Q_A : [],
  helpreplica: state.helpReducer.helpreplica.length > 0 ? state.helpReducer.helpreplica : [],
});

export function mapDispatchToProps(dispatch) {
  return {
    getQ_A: () => dispatch(getQ_A()),
    setQ_A: (data) => dispatch(setQ_A(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Help);