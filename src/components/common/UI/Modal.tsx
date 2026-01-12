import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
    disableBackdropClick?: boolean;
    showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    title,
    children,
    actions,
    maxWidth = 'sm',
    fullWidth = true,
    disableBackdropClick = false,
    showCloseButton = true,
}) => {
    const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (disableBackdropClick && reason === 'backdropClick') {
            return;
        }
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    minHeight: 200,
                },
            }}
        >
            {(title || showCloseButton) && (
                <DialogTitle sx={{ m: 0, p: 3, pb: 2 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        {title && (
                            <Typography variant="h6" fontWeight="bold">
                                {title}
                            </Typography>
                        )}
                        {showCloseButton && (
                            <IconButton
                                aria-label="close"
                                onClick={onClose}
                                sx={{
                                    ml: 2,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Box>
                </DialogTitle>
            )}
            <DialogContent dividers sx={{ p: 3 }}>
                {children}
            </DialogContent>
            {actions && <DialogActions sx={{ p: 3, pt: 2 }}>{actions}</DialogActions>}
        </Dialog>
    );
};

export default Modal;
