import React from 'react';
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';

export interface BadgeProps extends MuiBadgeProps {
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    badgeContent?: React.ReactNode;
    max?: number;
    overlap?: 'circular' | 'rectangular';
    anchorOrigin?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'right';
    };
}

const Badge: React.FC<BadgeProps> = ({
    children,
    color = 'primary',
    badgeContent,
    max,
    overlap = 'circular',
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
    ...rest
}) => {
    return (
        <MuiBadge
            color={color}
            badgeContent={badgeContent}
            max={max}
            overlap={overlap}
            anchorOrigin={anchorOrigin}
            {...rest}
        >
            {children}
        </MuiBadge>
    );
};

export default Badge;
