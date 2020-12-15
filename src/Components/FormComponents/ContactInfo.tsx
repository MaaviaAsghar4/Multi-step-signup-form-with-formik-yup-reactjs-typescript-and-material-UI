import React from "react";
import { TextField, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { contactProp } from "../../type";
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

const ContactInfo: React.FC<contactProp> = ({
  handleNext,
  handleBack,
  activeStep,
  steps,
  handleContactState,
}) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      cellno: "",
      address: "",
      zipcode: "",
    },
    validationSchema: Yup.object({
      cellno: Yup.number()
        .required("Phone number is required")
        .test(
          "len",
          "Please use +92xxxxxxxxxx format",
          (val: any) => val && val.toString().length === 12
        )
        .positive()
        .integer(),
      address: Yup.string().required("adress is required"),
      zipcode: Yup.number()
        .required("zip code is required")
        .positive()
        .integer(),
    }),
    onSubmit: (values) => {
      handleContactState(
        parseInt(values.cellno),
        values.address,
        parseInt(values.zipcode)
      );
      handleNext();
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            id="cellno"
            label="Number"
            type="number"
            name="cellno"
            variant="outlined"
            fullWidth
            className={classes.marginBottom}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.cellno}
            helperText={
              formik.touched.cellno && formik.errors.cellno
                ? formik.errors.cellno
                : ""
            }
          />
        </div>
        <div>
          <TextField
            id="address"
            label="Address"
            type="text"
            name="address"
            variant="outlined"
            fullWidth
            className={classes.marginBottom}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.address}
            helperText={
              formik.touched.address && formik.errors.address
                ? formik.errors.address
                : ""
            }
          />
        </div>
        <div>
          <TextField
            id="zipcode"
            label="ZIP Code"
            type="number"
            name="zipcode"
            variant="outlined"
            fullWidth
            className={classes.marginBottom}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.zipcode}
            helperText={
              formik.touched.zipcode && formik.errors.zipcode
                ? formik.errors.zipcode
                : ""
            }
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

export default ContactInfo;
