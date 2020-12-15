import React from "react";
import { TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstName: {
      marginRight: "10px",
      marginBottom: "10px",
    },
    marginBottom: {
      marginBottom: "10px",
    },
  })
);

const AccountInfo = () => {
  const classes = useStyles();
  return (
    <div>
      <div>
        <TextField
          id="bankName"
          label="Bank Name"
          type="text"
          variant="outlined"
          fullWidth
          className={classes.marginBottom}
        />
      </div>
      <div>
        <TextField
          id="accountType"
          label="Account Type"
          type="text"
          variant="outlined"
          fullWidth
          className={classes.marginBottom}
        />
      </div>
      <div>
        <TextField
          id="accountNumber"
          label="Account Number"
          type="number"
          variant="outlined"
          fullWidth
          className={classes.marginBottom}
        />
      </div>
    </div>
  );
};

export default AccountInfo;
