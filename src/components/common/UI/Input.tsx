import React from 'react';
import {
    TextField,
    TextFieldProps,
    InputAdornment,
    IconButton,
    FormControl,
    FormLabel,
    FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface InputProps extends Omit<TextFieldProps, 'error'> {
    label?: string;
    error?: string;
    helperText?: string;
    showPasswordToggle?: boolean;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    showPasswordToggle = false,
    startAdornment,
    endAdornment,
    type = 'text',
    ...props
}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    const renderEndAdornment = () => {
        if (showPasswordToggle && type === 'password') {
            return (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            );
        }

        return endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : null;
    };

    return (
        <FormControl fullWidth error={!!error}>
            {label && <FormLabel sx={{ mb: 1, fontWeight: 600 }}>{label}</FormLabel>}
            <TextField
                variant="outlined"
                type={inputType}
                error={!!error}
                InputProps={{
                    startAdornment: startAdornment ? (
                        <InputAdornment position="start">{startAdornment}</InputAdornment>
                    ) : null,
                    endAdornment: renderEndAdornment(),
                    sx: {
                        borderRadius: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                    },
                }}
                {...props}
            />
            {(error || helperText) && (
                <FormHelperText sx={{ ml: 0 }}>{error || helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

export default Input;
