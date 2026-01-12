import React from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps, FormControlLabel } from '@mui/material';

export interface CheckboxProps extends MuiCheckboxProps {
    label?: string;
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const Checkbox: React.FC<CheckboxProps> = ({ label, labelPlacement = 'end', ...rest }) => {
    if (label) {
        return (
            <FormControlLabel
                control={<MuiCheckbox {...rest} />}
                label={label}
                labelPlacement={labelPlacement}
            />
        );
    }
    return <MuiCheckbox {...rest} />;
};

export default Checkbox;
