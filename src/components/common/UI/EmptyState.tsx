import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add, SearchOff } from '@mui/icons-material';

interface EmptyStateProps {
    title?: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No data found',
    message,
    actionLabel,
    onAction,
    icon = <SearchOff sx={{ fontSize: 60 }} />,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                px: 2,
                textAlign: 'center',
            }}
        >
            <Box
                sx={{
                    color: 'action.disabled',
                    mb: 2,
                }}
            >
                {icon}
            </Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
                {message}
            </Typography>
            {actionLabel && onAction && (
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={onAction}
                    sx={{ mt: 2 }}
                >
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
};
