import React from 'react';
import { Drawer as MuiDrawer, DrawerProps as MuiDrawerProps } from '@mui/material';

export interface DrawerProps extends MuiDrawerProps {
    children: React.ReactNode;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    open: boolean;
    onClose: () => void;
    width?: number | string;
}

const Drawer: React.FC<DrawerProps> = ({ children, anchor = 'left', open, onClose, width = 280, ...rest }) => {
    return (
        <MuiDrawer
            anchor={anchor}
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { width } }}
            {...rest}
        >
            {children}
        </MuiDrawer>
    );
};

export default Drawer;
