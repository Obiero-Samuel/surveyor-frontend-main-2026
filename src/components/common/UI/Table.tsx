import React from 'react';
import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableSortLabel,
    Checkbox,
    Typography,
    Box,
} from '@mui/material';
import { EmptyState } from './EmptyState';

export interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'left' | 'center' | 'right';
    format?: (value: any, row?: any) => any;
    sortable?: boolean;
    renderCell?: (row: any) => React.ReactNode;
}

interface TableProps {
    columns: Column[];
    data: any[];
    loading?: boolean;
    pagination?: {
        page: number;
        rowsPerPage: number;
        totalRows: number;
        onPageChange: (page: number) => void;
        onRowsPerPageChange: (rowsPerPage: number) => void;
    };
    sorting?: {
        orderBy: string;
        order: 'asc' | 'desc';
        onSort: (columnId: string) => void;
    };
    selection?: {
        selected: string[];
        onSelectAll: (checked: boolean) => void;
        onSelect: (id: string, checked: boolean) => void;
        getRowId: (row: any) => string;
    };
    emptyMessage?: string;
    stickyHeader?: boolean;
    size?: 'small' | 'medium';
}

const Table: React.FC<TableProps> = ({
    columns,
    data,
    loading = false,
    pagination,
    sorting,
    selection,
    emptyMessage = 'No data available',
    stickyHeader = true,
    size = 'medium',
}) => {
    const handleChangePage = (event: unknown, newPage: number) => {
        pagination?.onPageChange(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        pagination?.onRowsPerPageChange(parseInt(event.target.value, 10));
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        selection?.onSelectAll(event.target.checked);
    };

    const handleSelect = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        selection?.onSelect(id, event.target.checked);
    };

    const isSelected = (id: string) => selection?.selected.indexOf(id) !== -1;

    if (!loading && data.length === 0) {
        return <EmptyState message={emptyMessage} />;
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
            <TableContainer sx={{ maxHeight: stickyHeader ? 440 : 'auto' }}>
                <MuiTable stickyHeader={stickyHeader} size={size}>
                    <TableHead>
                        <TableRow>
                            {selection && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={
                                            selection.selected.length > 0 &&
                                            selection.selected.length < data.length
                                        }
                                        checked={
                                            data.length > 0 && selection.selected.length === data.length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                            )}
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{ fontWeight: 600, backgroundColor: 'action.hover' }}
                                >
                                    {column.sortable && sorting ? (
                                        <TableSortLabel
                                            active={sorting.orderBy === column.id}
                                            direction={sorting.orderBy === column.id ? sorting.order : 'asc'}
                                            onClick={() => sorting.onSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + (selection ? 1 : 0)} align="center">
                                    <Box py={4}>
                                        <Typography color="text.secondary">Loading...</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => {
                                const rowId = selection?.getRowId(row);
                                const isItemSelected = rowId ? isSelected(rowId) : false;

                                return (
                                    <TableRow
                                        hover
                                        key={rowId || row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        {selection && rowId && (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onChange={handleSelect(rowId)}
                                                />
                                            </TableCell>
                                        )}
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.renderCell
                                                        ? column.renderCell(row)
                                                        : column.format
                                                            ? column.format(value, row)
                                                            : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            {pagination && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={pagination.totalRows}
                    rowsPerPage={pagination.rowsPerPage}
                    page={pagination.page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    );
};

export default Table;
