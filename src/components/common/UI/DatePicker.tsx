import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

export interface DatePickerProps extends Omit<MuiDatePickerProps<Dayjs>, 'value' | 'onChange' | 'renderInput'> {
    label?: string;
    value: Dayjs | null;
    onChange: (date: Dayjs | null) => void;
    error?: boolean;
    helperText?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, error, helperText, ...rest }) => {
    return (
        <MuiDatePicker
            label={label}
            value={value}
            onChange={onChange}
            {...rest}
            slotProps={{
                textField: {
                    fullWidth: true,
                    error,
                    helperText,
                },
            }}
        />
    );
};

export default DatePicker;
