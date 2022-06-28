import React from 'react';
import { makeStyles, useTheme, createStyles } 
        from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const steps = [
    {
      label: 'Select campaign settings',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];
  
  
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
      
  }),
);
  
function getSteps() {
  return [<b style={{color:'purple'}}>'Enter Personal Details'</b>, 
  <b style={{color:'purple'}}>'Enter Education Details'</b>, 
  <b style={{color:'purple'}}>'Enter Address'</b>];
}
  
function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <form class="form-group">
        <label>First Name</label>
        <input type="text" placeholder="First Name"></input>
        <br></br>
        <label>Last Name</label>
        <input type="text" placeholder="Last Name"></input>
        </form>
      );
    case 1:
      return (
        <form class="form-group">
        <label>High School Percentage</label>
        <input type="number" placeholder="High School Percentage"></input>
        <br></br>
        <label>Graduation percentage</label>
        <input type="number" placeholder="Graduation Percentage"></input>
        </form>
      );
    case 2:
      return (
        <form class="form-group">
        <label>Permanent Address</label>
        <input type="text" placeholder="Permanent Address"></input>
        <br></br>
        <label>Temporary Address</label>
        <input type="text" placeholder="Temporary Address"></input>
        </form>
      );
    default:
      return 'Unknown step';
  }
}
  
export default function GeekStepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    return (
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography>{steps[activeStep].label}</Typography>
        </Paper>
        <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
          {steps[activeStep].description}
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    );
  
}