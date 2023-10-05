'use client'

import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { MaterialReactTable, MaterialReactTableProps } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Dispatch, SetStateAction } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props<T extends Record<string, any>> extends MaterialReactTableProps<T> {
    data: T[]
    openModal: Dispatch<SetStateAction<boolean>>
    handleDelete: Dispatch<SetStateAction<any>>
    title: string
}

const TablePro = <T extends Record<string, any>>({ data, openModal, title, handleDelete, ...rest }: Props<T>) => {

    return <MaterialReactTable
        localization={MRT_Localization_ES}
        initialState={{ density: 'compact' }}
        data={data}
        // enableRowSelection //enable some features
        enableColumnOrdering
        enableGlobalFilter
        enableEditing
        enableExpandAll
        renderTopToolbarCustomActions={() => (
            <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    color="primary"
                    onClick={() => openModal(true)}
                    variant="outlined"
                >
                    Crear
                </Button>
                <Typography>{title}</Typography>
            </Box>
        )}
        renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip arrow placement="left" title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(row.original)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        )}
        muiTableContainerProps={{
            sx: {
                minHeight: 400,
            }
        }}
        {...rest}
    />

}

export default TablePro