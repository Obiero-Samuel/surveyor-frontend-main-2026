import React from 'react';
import { Menu as MuiMenu, MenuProps as MuiMenuProps, MenuItem as MuiMenuItem, ListItemIcon, ListItemText } from '@mui/material';

export interface MenuItem {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

export interface MenuProps extends MuiMenuProps {
    items: MenuItem[];
    anchorEl: null | HTMLElement;
    open: boolean;
    onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ items, anchorEl, open, onClose, ...rest }) => {
    return (
        <MuiMenu anchorEl={anchorEl} open={open} onClose={onClose} {...rest}>
            {items.map((item, idx) => (
                <MuiMenuItem key={item.label + idx} onClick={item.onClick} disabled={item.disabled}>
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText>{item.label}</ListItemText>
                </MuiMenuItem>
            ))}
        </MuiMenu>
    );
};

export default Menu;
