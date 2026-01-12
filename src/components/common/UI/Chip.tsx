import React from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';

export interface ChipProps extends MuiChipProps {
  label: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
  onDelete?: () => void;
  icon?: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({ label, color = 'default', size = 'medium', variant = 'filled', onDelete, icon, ...rest }) => {
  return (
    <MuiChip
      label={label}
      color={color}
      size={size}
      variant={variant}
      onDelete={onDelete}
      icon={icon}
      {...rest}
    />
  );
};

export default Chip;
