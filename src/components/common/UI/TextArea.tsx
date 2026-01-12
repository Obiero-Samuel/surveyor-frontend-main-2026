import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export interface TextAreaProps extends Omit<TextFieldProps, 'multiline'> {
    label?: string;
    error?: boolean;
    helperText?: string;
    rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({ label, error, helperText, rows = 4, ...rest }) => {
    return (
        <TextField
            label={label}
            error={error}
            helperText={helperText}
            multiline
            rows={rows}
            fullWidth
            {...rest}
        />
    );
};

export default TextArea;
