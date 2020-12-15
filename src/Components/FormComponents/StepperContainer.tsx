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
      width: "100vw",
    },
    center: {
      textAlign: "center",
    },
  })
);

function getSteps() {
  return ["User Info", "Contact Info", "Bank Details"];
}

function getStepContent(
  activeStep: number,
  handleNext: () => void,
  handleBack: () => void,
  steps: string[],
  handleBankState: (bank: string, type: string, accNumber: number) => void,
  handleUserState: (
    firstname: string,
    lastname: string,
    emailadd: string
  ) => void,
  handleContactState: (phonenumber: number, add: string, zip: number) => void
) {
  switch (activeStep) {
    case 0:
      return (
        <UserInfo
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={activeStep}
          steps={steps}
          handleUserState={handleUserState}
        />
      );
    case 1:
      return (
        <ContactInfo
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={activeStep}
          steps={steps}
          handleContactState={handleContactState}
        />
      );
    case 2:
      return (
        <AccountInfo
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={activeStep}
          steps={steps}
          handleBankState={handleBankState}
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
  let [firstName, setFirstName] = React.useState("");
  let [lastName, setLastName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [phoneNumber, setPhoneNumber] = React.useState(0);
  let [address, setAddress] = React.useState("");
  let [zipCode, setZipCode] = React.useState(0);
  let [bankName, setBankName] = React.useState("");
  let [accountType, setAccountType] = React.useState("");
  let [accountNumber, setAccountNumber] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleUserState = (
    firstname: string,
    lastname: string,
    emailadd: string
  ) => {
    setFirstName(firstname);
    setLastName(lastname);
    setEmail(emailadd);
  };

  const handleBankState = (bank: string, type: string, accNumber: number) => {
    setBankName(bank);
    setAccountType(type);
    setAccountNumber(accNumber);
  };

  const handleContactState = (
    phonenumber: number,
    add: string,
    zip: number
  ) => {
    setPhoneNumber(phonenumber);
    setAddress(add);
    setZipCode(zip);
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
                <div>
                  <strong>User Details</strong>
                  <p>
                    Name: <strong>{`${firstName} ${lastName}`}</strong>
                  </p>
                  <p>
                    Email: <strong>{`${email}`}</strong>
                  </p>
                  <strong>Contact Details</strong>
                  <p>
                    Phone Number: <strong>{`${phoneNumber}`}</strong>
                  </p>
                  <p>
                    Address: <strong>{`${address}`}</strong>
                  </p>
                  <p>
                    Zip Code: <strong>{`${zipCode}`}</strong>
                  </p>
                  <strong>Bank Details</strong>
                  <p>
                    Bank: <strong>{`${bankName}`}</strong>
                  </p>
                  <p>
                    Account Type: <strong>{`${accountType}`}</strong>
                  </p>
                  <p>
                    Account Number: <strong>{`${accountNumber}`}</strong>
                  </p>
                </div>
              </Typography>
              <div className={classes.center}>
                <Button variant="contained" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(
                  activeStep,
                  handleNext,
                  handleBack,
                  steps,
                  handleBankState,
                  handleUserState,
                  handleContactState
                )}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperContainer;
