import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    loading = false,
    disabled = false,
    startIcon,
    endIcon,
    fullWidth = false,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    ...props
}) => {
    return (
        <MuiButton
            variant={variant}
            color={color}
            size={size}
            disabled={disabled || loading}
            startIcon={loading ? undefined : startIcon}
            endIcon={loading ? undefined : endIcon}
            fullWidth={fullWidth}
            sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                ...props.sx,
            }}
            {...props}
        >
            {loading ? (
                <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    {children}
                </>
            ) : (
                children
            )}
        </MuiButton>
    );
};

export default Button;
