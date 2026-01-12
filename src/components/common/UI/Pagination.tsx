import React from 'react';
import { Pagination as MuiPagination, PaginationProps as MuiPaginationProps, Box } from '@mui/material';

export interface PaginationProps extends MuiPaginationProps {
    count: number;
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
    color?: 'primary' | 'secondary' | 'standard';
    size?: 'small' | 'medium' | 'large';
}

const Pagination: React.FC<PaginationProps> = ({ count, page, onChange, color = 'primary', size = 'medium', ...rest }) => {
    return (
        <Box display="flex" justifyContent="center" py={2}>
            <MuiPagination
                count={count}
                page={page}
                onChange={onChange}
                color={color}
                size={size}
                {...rest}
            />
        </Box>
    );
};

export default Pagination;
