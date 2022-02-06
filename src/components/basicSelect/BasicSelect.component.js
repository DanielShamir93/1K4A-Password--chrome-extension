import React from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function BasicSelect({ accounts, accountSelectedName, setAccountSelectedName }) {

  return (
    <Box sx={{ width: 400 }}>
      <FormControl fullWidth>
        <InputLabel 
          id="demo-simple-select-label"
          style={{fontFamily: "Goldman", fontSize: "20px"}}
        >
            My Accounts
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={accountSelectedName}
          style={{fontSize: "30px", fontFamily: "Goldman", textAlign: "center"}}
          onChange={(e) => {setAccountSelectedName(e.target.value)}}
        >
          {accounts.map((account) => {
            return (
              <MenuItem
                style={{fontSize: "20px", fontFamily: "Goldman"}}
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
