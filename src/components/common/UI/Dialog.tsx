import React from 'react';
import { Dialog as MuiDialog, DialogProps as MuiDialogProps, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogProps extends MuiDialogProps {
    title?: string;
    open: boolean;
    onClose: () => void;
    actions?: React.ReactNode;
    children: React.ReactNode;
    showCloseIcon?: boolean;
}

const Dialog: React.FC<DialogProps> = ({ title, open, onClose, actions, children, showCloseIcon = true, ...rest }) => {
    return (
        <MuiDialog open={open} onClose={onClose} {...rest}>
            {title && (
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {title}
                    {showCloseIcon && (
                        <IconButton aria-label="close" onClick={onClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    )}
                </DialogTitle>
            )}
            <DialogContent>{children}</DialogContent>
            {actions && <DialogActions>{actions}</DialogActions>}
        </MuiDialog>
    );
};

export default Dialog;
