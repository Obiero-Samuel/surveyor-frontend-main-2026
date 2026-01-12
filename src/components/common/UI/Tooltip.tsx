import React from 'react';
import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from '@mui/material';

export interface TooltipProps extends MuiTooltipProps {
    title: React.ReactNode;
    children: React.ReactElement;
    placement?: MuiTooltipProps['placement'];
}

const Tooltip: React.FC<TooltipProps> = ({ title, children, placement = 'top', ...rest }) => {
    return (
        <MuiTooltip title={title} placement={placement} arrow {...rest}>
            {children}
        </MuiTooltip>
    );
};

export default Tooltip;
