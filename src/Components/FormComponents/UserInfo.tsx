import { TextField, Button } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userProp } from "../../type";

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

const UserInfo: React.FC<userProp> = ({
  handleNext,
  handleBack,
  activeStep,
  steps,
}) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .max(16, "firstName must not exceed 16 characters")
        .required("First name is required"),
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
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            id="firstname"
            label="First Name"
            type="text"
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstname}
            className={classes.firstName}
            helperText={
              formik.touched.firstname && formik.errors.firstname
                ? formik.errors.firstname
                : ""
            }
          />
          <TextField
            id="lastname"
            label="Last Name"
            type="text"
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastname}
            className={classes.marginBottom}
            helperText={
              formik.touched.lastname && formik.errors.lastname
                ? formik.errors.lastname
                : ""
            }
          />
        </div>
        <div>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            fullWidth
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
            className={classes.marginBottom}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullWidth
            value={formik.values.password}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
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
      </form>
    </div>
  );
};

export default UserInfo;
