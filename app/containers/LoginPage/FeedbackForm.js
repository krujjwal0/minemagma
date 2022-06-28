import React, { useState, useEffect, memo } from 'react';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import QuestionMarkIcon from '@material-ui/icons/QuestionMark';
import HelpIcon from '@material-ui/icons/Help';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import './style.css';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import FormImg from './images/formImage.png';
import logo from '../../images/logo.svg';
import {
  getFeedbackFormData,
  setFeedbackFormData,
  saveDataFeedbackForm,
  setShowToFeedBackPage,
  setFeedbackRadioCheck,
} from './actions';
import saga from './saga';
import { setNavBar } from '../App/actions';

// const steps = [
//   {
//     label: '',
//     description: ``,
//   },
//   {
//     label: '',
//     description: '',
//   },
//   {
//     label: '',
//     description: ``,
//   },
// ];

const steps = ['', '', '', '', '', '', '', '', '', ''];
const key = 'loginReducer';

function FeedbackForm({
  feedbackFormData,
  getFeedbackFormData,
  setFeedbackFormData,
  setNavBar,
  setFeedbackRadioCheck,
  feedbackRadioCheck,
  saveDataFeedbackForm,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const history = useHistory();

  useEffect(() => {
    console.log('inside useeffect', feedbackFormData, feedbackRadioCheck);
    getFeedbackFormData();

    // saveDataFeedbackForm();
    // setShowToFeedBackPage();
  }, []);

  useEffect(() => {
    console.log('feedbackRadioCheck===', feedbackRadioCheck);
  }, [feedbackRadioCheck]);

  useEffect(() => {
    setTotalSteps(feedbackFormData.length);
    allStepCompleted = completedSteps === totalSteps;
    console.log('Lngth=====', totalSteps, allStepCompleted);
  }, [feedbackFormData, totalSteps]);
  const [activeStep, setActiveStep] = React.useState(0);
  // const [feedbackRadioCheck, setFeedbackRadioCheck] = useState([]);
  // let feedbackRadioCheck=[];
  const [completed, setCompleted] = useState({});
  const [selectedOption, setSelectedOption] = useState(0);

  const [totalSteps, setTotalSteps] = useState(0);
  const completedSteps = Object.keys(completed).length;
  let allStepCompleted = completedSteps === totalSteps;

  useEffect(() => {}, [completed]);

  const onPostQ_A = () => {
    saveDataFeedbackForm(feedbackRadioCheck); //Save all answers
    history.push('/dashboard');
    setNavBar(true);
  };

  const handleNext = () => {
    console.log(' Length of feedback===', feedbackFormData.length, activeStep);
    if (selectedOption != 0) {
      setFeedbackRadioCheck(
        feedbackFormData[activeStep].id,
        parseInt(selectedOption),
      ); //Save all answers
    }

    //Individual api call for post
    // saveDataFeedbackForm({ questionId: feedbackFormData[activeStep].id, selectedOptionId: selectedOption });
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSelectedOption(0);
    if (feedbackFormData.length - 1 == activeStep) {
      //Saga call Post
      onPostQ_A();
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const [
    redirectToUserManagementPage,
    setRedirectToUserManagementPage,
  ] = useState(false);

  if (redirectToUserManagementPage) {
    return <Redirect to={{ pathname: '/formsecond' }} />;
  }

  const [redirectToFeedbackPageTwo, setRedirectToFeedbackPageTwo] = useState(
    false,
  );

  if (redirectToFeedbackPageTwo) {
    return <Redirect to={{ pathname: '/admin/users' }} />;
  }

  const onClickRadioFeedback = event => {
    // setFeedbackRadioCheck({ ...feedbackRadioCheck, questionId:feedbackFormData[activeStep].id,selectedOptionId: event.target.value });

    // setFeedbackRadioCheck(feedbackFormData[activeStep].id, event.target.value)
    setSelectedOption(event.target.value);
    console.log('checking radio button', event.target.value);
  };

  const handleSave = e => {
    let data;
    data = {
      feedbackRadioCheck,
    };
    // saveDataFeedbackForm(data);
    setRedirectToFeedbackPageTwo(true);

    const addFeedBackData = e => {
      handleSave();
      setShowToFeedBackPage(true);
    };
  };

  function helpPageCall() {
    history.push({ pathname: '/help' });
    setNavBar(true);
  }

  function handleSkip() {
    history.push('/dashboard');
    setNavBar(true);
  }
  // Try For OPTIONS MAPPING
  // let halwayPoint,colA,colB;
  // useEffect(()=>{

  // },[colA,colB])
  //  halwayPoint = Math.ceil(feedbackFormData[activeStep].options.length / 2)
  //  colA = feedbackFormData[activeStep].options.splice(0, halwayPoint);
  //  colB = feedbackFormData[activeStep].options.splice(-halwayPoint);
  // console.log("Col A and Col b===", colA, colB);

  return (
    <div className="bg-white w-full min-h-screen font-sans fixed">
      <div className="font-sans ml-28 flex justify-between">
        <div className="mt-22">
          <img
            src={logo}
            style={{ width: '250px', height: '80px', marginTop: '30px' }}
          />
        </div>
        <div className="font-sans mt-12" style={{ marginRight: '32%' }}>
          <label
            style={{
              color: '#132B6B',
              // fontFamily: 'Omnes',
              fontWeight: '700',
              fontSize: '35px',
              lineHeight: '110%',
              // marginLeft: '817px'
            }}
            className="font-sans absolute"
          >
            Feedback Form
          </label>
        </div>
      </div>

      <div className="flex ml-32">
        <div
          className="mt-20"
          style={{
            background: '#F46B6B',
            height: '270px',
            width: '3px',
            // marginLeft: '117px',
          }}
        />
        {/* {feedbackFormData.map((feed, index) => ( */}
        <div className="w-3/4 mt-20 ml-6">
          <label
            style={{
              height: '40px',
              left: '154px',
              // fontFamily: 'Omnes',
              fontWeight: '600',
              fontSize: '27px',
              lineHeight: '110%',
              color: '#F46B6B',
            }}
            className="font-sans flex ml-3 "
          >
<LabelImportantIcon className='mt-1' />
            <p
              style={{
                color: '#132B6B',
                // fontFamily: 'Nunito',
                fontWeight: '500',
                fontSize: '26px',
                lineHeight: '25px',
                width: '808px',
                height: '60px',
                left: '154px',
                // marginTop: '8px',
              }}
              className=" font-sans ml-3 mt-1"
            >
              {feedbackFormData[activeStep].question}
            </p>
          </label>

          <div className=" mt-6 ml-7 grid-cols-4" style={{fontSize: '30px'}}>
            {feedbackFormData[activeStep].options.length > 0 ?
              <div className='flex justify-between'>
              <RadioGroup
                
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onClick={onClickRadioFeedback}
                value={selectedOption}
             
                style={{fontSize: '30px'}}
              >
                {feedbackFormData[activeStep].options.map((opt, i) =>
                  <FormControlLabel
                    className="font-sans "
                    style={{
                      color: '#132B6B',
                      fontFamily: 'Omnes',
                      fontWeight: '400',
                      fontSize: '30px',
                      padding: '5px'
                    }}
                    value={opt.id}
                    control={
                      <Radio
                        checked={selectedOption == opt.id}
                      //value= 'enable'
                      //name="enable"
                      // checked={feedbackRadioCheck === 'Enable'}
                      className="text-2xl"
                      style={{fontSize: '40px'}}
                    
                      />
                     
                    }
                    
                    label={opt.description}
                   
                    
                    
                  />

                 
                )}</RadioGroup>
                </div>
              : <p>No options</p>}
           
          </div>
        </div>
        {/* ))} */}
        <div className=" ml-36 step_list " style={{ marginTop: '-2.5rem' }}>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              style={{ marginLeft: '0px', width: '20.77px' }}
            >
              {feedbackFormData.map((label, i) => (
                <Step key={i}>
                  <StepLabel />
                </Step>
              ))}
            </Stepper>
            {/* <Typography>
              All steps completed
            </Typography> */}
          </Box>
          {/* <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? <Typography variant="caption" /> : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </Box> */}
        </div>
      </div>
      <div className="">
        <div
          className="flex"
          // onClick={() => {
          //   helpPageCall();
          // }}
          style={{marginTop: '50px'}}
        >
          <HelpOutlineIcon
            className="ml-28"
            // onClick={()=>{history.push({pathname: '/help'})}}
            style={{
              backgroundColor: '#FFFFFF',
              width: '55px',
              height: '45px',
              color: '#132B6B',
            }}
            onClick={() => {
              helpPageCall();
            }}
          />
          <p
            className="font-sans mt-4 font-semibold "
            style={{ color: '#132B6B' }}
            onClick={() => {
              helpPageCall();
            }}
          >
            Help
          </p>
          <div>
            <img
              src={FormImg}
              style={{
                position: 'absolute',
                backgroundSize: '100% auto',
                width: '100%',
                height: '15%',
                content: '',
                left: '0',
                bottom: '0',
                // top: '612px',
              }}
            /></div>
            <div
              className="flex justify-end "
              style={{ marginLeft: '960px' }}
            >
              <div>
                <button
                  style={{
                    background: '#132B6B',
                    borderRadius: '60px',
                    color: 'white',
                    width: '115px',
                    height: '40px',
                    marginLeft: '-90px',
                  }}
                  className="font-sans absolute"
                  onClick={handleSkip}
                >
                  Skip
                </button>
                {/* <div>
            {allStepCompleted ?
              (
                <Typography>All Steps are Completed</Typography>
              ) : ( */}
              
                
                  <button
                    style={{
                      background: '#132B6B',
                      borderRadius: '60px',
                      color: 'white',
                      width: '115px',
                      height: '40px',
                    }}
                    className="font-sans absolute ml-12"
                    onClick={handleNext}
                  >
                    NEXT
                  </button>
                  </div>
                  
            </div>
        </div>
      </div>
    </div>
  );
}

FeedbackForm.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = state => {
  console.log(
    'checking data of feedbackform state to props',
    state.loginReducer.feedbackFormData,
  );
  return {
    // feedbackFormData: state.loginReducer.feedbackFormData
    //   ? state.loginReducer.feedbackFormData
    //   : [],

    feedbackFormData:
      state.loginReducer.feedbackFormData.length > 0
        ? state.loginReducer.feedbackFormData
        : [],
    feedbackRadioCheck:
      state.loginReducer.feedbackRadioCheck.length > 0
        ? state.loginReducer.feedbackRadioCheck
        : [],
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    getFeedbackFormData: data => dispatch(getFeedbackFormData(data)),
    setFeedbackFormData: data => dispatch(setFeedbackFormData(data)),
    saveDataFeedbackForm: data => dispatch(saveDataFeedbackForm(data)),
    setShowToFeedBackPage: data => dispatch(setShowToFeedBackPage(data)),
    setNavBar: data => dispatch(setNavBar(data)),
    setFeedbackRadioCheck: (qId, oId) =>
      dispatch(setFeedbackRadioCheck(qId, oId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FeedbackForm);
