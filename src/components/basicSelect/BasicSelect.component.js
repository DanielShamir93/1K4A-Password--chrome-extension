import React from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function BasicSelect({ accounts, accountSelectedName, setAccountSelectedName }) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">My Accounts</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={accountSelectedName}
          onChange={(e) => {setAccountSelectedName(e.target.value)}}
        >
          <MenuItem value="select-account">Select Account</MenuItem>
          {accounts.map((account) => {
            return (
              <MenuItem
                key={account._id}
                value={account._id}
              >{`${account.accountName} (${account.accountSubname})`}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
