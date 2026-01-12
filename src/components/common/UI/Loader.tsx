import React from 'react';
import { CircularProgress, Box } from '@mui/material';

interface LoaderProps {
  size?: number;
  color?: 'primary' | 'secondary' | 'inherit' | 'success' | 'error' | 'info' | 'warning';
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 40, color = 'primary', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          background: 'rgba(255,255,255,0.7)',
        }}
      >
        <CircularProgress size={size} color={color} />
      </Box>
    );
  }
  return (
    <Box display="flex" alignItems="center" justifyContent="center" py={2}>
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export default Loader;
