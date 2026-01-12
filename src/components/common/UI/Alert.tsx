import React from 'react';
import { Alert as MuiAlert, AlertTitle, Snackbar } from '@mui/material';

export interface AlertProps {
  open: boolean;
  onClose: () => void;
  severity?: 'error' | 'warning' | 'info' | 'success';
  title?: string;
  message: string;
  autoHideDuration?: number;
  action?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  open,
  onClose,
  severity = 'info',
  title,
  message,
  autoHideDuration = 4000,
  action,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <MuiAlert onClose={onClose} severity={severity} sx={{ width: '100%' }} action={action} elevation={6} variant="filled">
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
