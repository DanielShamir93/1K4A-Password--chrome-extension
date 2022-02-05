import React from 'react';
import TextField from "@material-ui/core/TextField";

export default function TextFieldInput({ label, setEmail }) {


  const handleChange = ({target: {value}}) => {
    setEmail(value)
  };

  return (
      <TextField
        variant="outlined"
        label={label}
        onChange={(e) => { handleChange(e) }}
        style={{width: "250px"}}
      />
  );
}
