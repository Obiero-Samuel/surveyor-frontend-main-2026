import React from 'react';
import { Collapse as MuiCollapse, CollapseProps as MuiCollapseProps } from '@mui/material';

export interface CollapseProps extends MuiCollapseProps {
    children: React.ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({ children, ...rest }) => {
    return <MuiCollapse {...rest}>{children}</MuiCollapse>;
};

export default Collapse;
