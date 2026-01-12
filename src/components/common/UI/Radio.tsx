import React from 'react';
import { Radio as MuiRadio, RadioProps as MuiRadioProps, FormControlLabel, RadioGroup as MuiRadioGroup, FormControl, FormLabel } from '@mui/material';

export interface RadioProps extends MuiRadioProps {
    label?: string;
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

export interface RadioGroupOption {
    value: string | number;
    label: string;
}

export interface RadioGroupProps {
    name: string;
    label?: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    options: RadioGroupOption[];
    row?: boolean;
    error?: boolean;
    helperText?: string;
}

export const Radio: React.FC<RadioProps> = ({ label, labelPlacement = 'end', ...rest }) => {
    if (label) {
        return (
            <FormControlLabel
                control={<MuiRadio {...rest} />}
                label={label}
                labelPlacement={labelPlacement}
            />
        );
    }
    return <MuiRadio {...rest} />;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({ name, label, value, onChange, options, row = false, error, helperText }) => {
    return (
        <FormControl component="fieldset" error={error} sx={{ my: 1 }}>
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <MuiRadioGroup name={name} value={value} onChange={onChange} row={row}>
                {options.map((option) => (
                    <FormControlLabel key={option.value} value={option.value} control={<MuiRadio />} label={option.label} />
                ))}
            </MuiRadioGroup>
            {helperText && (
                <span style={{ color: error ? '#d32f2f' : undefined, fontSize: 12, marginTop: 4 }}>{helperText}</span>
            )}
        </FormControl>
    );
};
