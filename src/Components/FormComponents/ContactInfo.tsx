import React from "react";
import { TextField, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { userProp } from "../../type";
import { useFormik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstName: {
      marginRight: "10px",
      marginBottom: "10px",
    },
    marginBottom: {
      marginBottom: "10px",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    center: {
      textAlign: "center",
    },
  })
);

const ContactInfo: React.FC<userProp> = ({
  handleNext,
  handleBack,
  activeStep,
  steps,
}) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      phonenumber: "",
      address: "",
      zipcode: "",
    },
    validationSchema: Yup.object({
      phonenumber: Yup.number()
        .max(13, "please write in this format +923xxxxxxxxx")
        .required("Phone number is required"),
      lastname: Yup.string()
        .max(16, "lastName must not exceed 16 characters")
        .required("Last name is required"),
      email: Yup.string()
        .email("Please enter valid email address")
        .required("email is required"),
      password: Yup.string()
        .min(6, "Password must be 6 characters long")
        .required("password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleNext();
    },
  });
  return (
    <div>
      <div>
        <TextField
          id="phoneNumber"
          label="Number"
          type="number"
          variant="outlined"
          fullWidth
          className={classes.marginBottom}
        />
      </div>
      <div>
        <TextField
          id="address"
          label="Address"
          type="text"
          variant="outlined"
          fullWidth
          className={classes.marginBottom}
        />
      </div>
      <div>
        <TextField
          id="zipcode"
          label="ZIP Code"
          type="number"
          variant="outlined"
          fullWidth
          className={classes.marginBottom}
        />
      </div>
      <div className={classes.center}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.backButton}
          variant="contained"
        >
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;
