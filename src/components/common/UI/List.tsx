import React from 'react';
import { List as MuiList, ListItem, ListItemText, ListItemIcon, ListProps as MuiListProps, Divider } from '@mui/material';

export interface ListItemData {
    label: string;
    icon?: React.ReactNode;
    secondary?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export interface ListProps extends MuiListProps {
    items: ListItemData[];
    dense?: boolean;
    divider?: boolean;
}

const List: React.FC<ListProps> = ({ items, dense = false, divider = false, ...rest }) => {
    return (
        <MuiList dense={dense} {...rest}>
            {items.map((item, idx) => (
                <React.Fragment key={item.label + idx}>
                    <ListItem button={!!item.onClick} onClick={item.onClick} disabled={item.disabled}>
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        <ListItemText primary={item.label} secondary={item.secondary} />
                    </ListItem>
                    {divider && idx < items.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </MuiList>
    );
};

export default List;
