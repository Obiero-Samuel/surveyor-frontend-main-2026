import React from 'react';
import { LinearProgress, LinearProgressProps, Box, Typography } from '@mui/material';

export interface ProgressBarProps extends LinearProgressProps {
    value?: number;
    showLabel?: boolean;
    label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, showLabel = false, label, ...rest }) => {
    return (
        <Box display="flex" alignItems="center" gap={2} width="100%">
            <Box flex={1}>
                <LinearProgress variant={value !== undefined ? 'determinate' : 'indeterminate'} value={value} {...rest} />
            </Box>
            {showLabel && (
                <Typography variant="body2" color="text.secondary">
                    {label ? label : value !== undefined ? `${Math.round(value)}%` : ''}
                </Typography>
            )}
        </Box>
    );
};

export default ProgressBar;
