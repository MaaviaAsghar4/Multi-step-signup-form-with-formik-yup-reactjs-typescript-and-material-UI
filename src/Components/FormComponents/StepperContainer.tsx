import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UserInfo from "./UserInfo";
import ContactInfo from "./ContactInfo";
import AccountInfo from "./AccountInfo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    instructions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "50vh",
      width: "100vw",
    },
  })
);

function getSteps() {
  return ["User Info", "Contact Info", "Bank Account Info"];
}

function getStepContent(
  activeStep: number,
  handleNext: () => void,
  handleBack: () => void,
  steps: string[]
) {
  switch (activeStep) {
    case 0:
      return (
        <UserInfo
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={activeStep}
          steps={steps}
        />
      );
    case 1:
      return (
        <ContactInfo
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={activeStep}
          steps={steps}
        />
      );
    case 2:
      return (
        <AccountInfo
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={activeStep}
          steps={steps}
        />
      );
    default:
      return <h1>Error 404: Not Found</h1>;
  }
}

const StepperContainer = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button variant="contained" onClick={handleReset}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep, handleNext, handleBack, steps)}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperContainer;
