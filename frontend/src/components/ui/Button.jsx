import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ColorButton = ({ color = 'primary', variant = 'contained', label = 'Button' ,  type = 'submit' }) => {
  return (
    <Button color={color} variant={variant} type={type}>
      {label}
    </Button>
  );
};

export default function ButtonComponent({ color = 'primary', label = 'Click Me', variant = 'contained' }) {
  return (
    <Stack direction="row" spacing={2}>
      <ColorButton color={color} variant={variant} label={label} />
    </Stack>
  );
}
