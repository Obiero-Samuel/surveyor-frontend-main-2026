import React from 'react';
import { Fab as MuiFab, FabProps as MuiFabProps } from '@mui/material';

export interface FabProps extends MuiFabProps {
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    size?: 'small' | 'medium' | 'large';
    icon: React.ReactNode;
    label?: string;
}

const Fab: React.FC<FabProps> = ({ color = 'primary', size = 'medium', icon, label, ...rest }) => {
    return (
        <MuiFab color={color} size={size} aria-label={label} {...rest}>
            {icon}
        </MuiFab>
    );
};

export default Fab;
