import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    active?: boolean;
}

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, separator = <NavigateNextIcon fontSize="small" />, ...rest }) => {
    return (
        <MuiBreadcrumbs separator={separator} aria-label="breadcrumb" {...rest}>
            {items.map((item, idx) =>
                item.active ? (
                    <Typography color="text.primary" key={item.label + idx} fontWeight={600}>
                        {item.label}
                    </Typography>
                ) : (
                    <Link
                        key={item.label + idx}
                        color="inherit"
                        href={item.href}
                        underline="hover"
                        onClick={item.onClick}
                        sx={{ cursor: item.href || item.onClick ? 'pointer' : 'default' }}
                    >
                        {item.label}
                    </Link>
                )
            )}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;
