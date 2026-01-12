import React from 'react';
import { Popover as MuiPopover, PopoverProps as MuiPopoverProps } from '@mui/material';

export interface PopoverProps extends MuiPopoverProps {
    children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ children, ...rest }) => {
    return (
        <MuiPopover {...rest}>
            {children}
        </MuiPopover>
    );
};

export default Popover;
