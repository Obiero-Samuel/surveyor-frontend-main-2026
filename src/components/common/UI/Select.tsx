import React from 'react';
import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectProps as MuiSelectProps } from '@mui/material';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends MuiSelectProps {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: boolean;
}

const Select: React.FC<SelectProps> = ({ label, options, helperText, error, ...rest }) => {
  return (
    <FormControl fullWidth error={error} sx={{ my: 1 }}>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect label={label} {...rest}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && (
        <span style={{ color: error ? '#d32f2f' : undefined, fontSize: 12, marginTop: 4 }}>{helperText}</span>
      )}
    </FormControl>
  );
};

export default Select;
