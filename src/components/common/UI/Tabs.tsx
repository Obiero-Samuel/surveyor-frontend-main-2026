import React from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, TabsProps as MuiTabsProps, TabProps as MuiTabProps, Box } from '@mui/material';

export interface TabItem {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    disabled?: boolean;
}

export interface TabsProps extends MuiTabsProps {
    value: string | number;
    onChange: (event: React.SyntheticEvent, value: string | number) => void;
    items: TabItem[];
    variant?: 'standard' | 'scrollable' | 'fullWidth';
    indicatorColor?: 'primary' | 'secondary';
    textColor?: 'primary' | 'secondary' | 'inherit';
}

const Tabs: React.FC<TabsProps> = ({ value, onChange, items, variant = 'standard', indicatorColor = 'primary', textColor = 'primary', ...rest }) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <MuiTabs
                value={value}
                onChange={onChange}
                variant={variant}
                indicatorColor={indicatorColor}
                textColor={textColor}
                {...rest}
            >
                {items.map((item) => (
                    <MuiTab
                        key={item.value}
                        label={item.label}
                        value={item.value}
                        icon={item.icon}
                        disabled={item.disabled}
                    />
                ))}
            </MuiTabs>
        </Box>
    );
};

export default Tabs;
