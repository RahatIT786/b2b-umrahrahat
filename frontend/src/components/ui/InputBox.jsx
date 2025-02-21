import React from 'react';
import TextField from '@mui/material/TextField';

// DynamicInputField component definition
const DynamicInputField = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  id,
  name,
  className = '',
  label = 'Input Field',
  readOnly = false, // Added readOnly prop
  min,              // Added min prop
  max,              // Added max prop
}) => {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      className={className}
      label={label}
      variant="outlined"
      fullWidth
      InputProps={{
        readOnly: readOnly, // Apply readOnly here
        inputProps: {
          min: min,         // Apply min value
          max: max,         // Apply max value
        },
      }}
    />
  );
};

// InputBox component definition
const InputBox = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  id,
  name,
  className,
  label = 'Input Field',
  readOnly = false, // Pass readOnly prop
  min,              // Pass min prop
  max,              // Pass max prop
}) => {
  return (
    <DynamicInputField
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      className={className}
      label={label}
      readOnly={readOnly}
      min={min}
      max={max}
    />
  );
};

export default InputBox;
