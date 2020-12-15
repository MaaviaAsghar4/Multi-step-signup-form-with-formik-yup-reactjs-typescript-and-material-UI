import React from "react";
import { TextField, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { accountProp } from "../../type";
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

const AccountInfo: React.FC<accountProp> = ({
  handleNext,
  handleBack,
  activeStep,
  steps,
  handleBankState,
}) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      bankname: "",
      accounttype: "",
      accountnumber: "",
    },
    validationSchema: Yup.object({
      bankname: Yup.string().required("bank name is required"),
      accounttype: Yup.string().required("account type is required"),
      accountnumber: Yup.number()
        .required("account number code is required")
        .positive()
        .integer(),
    }),
    onSubmit: (values) => {
      handleBankState(
        values.bankname,
        values.accounttype,
        parseInt(values.accountnumber)
      );
      handleNext();
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            id="bankName"
            name="bankname"
            label="Bank Name"
            type="text"
            variant="outlined"
            fullWidth
            className={classes.marginBottom}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.bankname}
            helperText={
              formik.touched.bankname && formik.errors.bankname
                ? formik.errors.bankname
                : ""
            }
          />
        </div>
        <div>
          <TextField
            id="accountType"
            label="Account Type"
            type="text"
            variant="outlined"
            name="accounttype"
            fullWidth
            className={classes.marginBottom}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.accounttype}
            helperText={
              formik.touched.accounttype && formik.errors.accounttype
                ? formik.errors.accounttype
                : ""
            }
          />
        </div>
        <div>
          <TextField
            id="accountNumber"
            label="Account Number"
            type="number"
            variant="outlined"
            name="accountnumber"
            fullWidth
            className={classes.marginBottom}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.accountnumber}
            helperText={
              formik.touched.accountnumber && formik.errors.accountnumber
                ? formik.errors.accountnumber
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

export default AccountInfo;
