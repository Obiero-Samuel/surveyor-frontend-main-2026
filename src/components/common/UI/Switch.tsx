import React from 'react';
import { Switch as MuiSwitch, SwitchProps as MuiSwitchProps, FormControlLabel } from '@mui/material';

export interface SwitchProps extends MuiSwitchProps {
  label?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const Switch: React.FC<SwitchProps> = ({ label, labelPlacement = 'end', ...rest }) => {
  if (label) {
    return (
      <FormControlLabel
        control={<MuiSwitch {...rest} />}
        label={label}
        labelPlacement={labelPlacement}
      />
    );
  }
  return <MuiSwitch {...rest} />;
};

export default Switch;
