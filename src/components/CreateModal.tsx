'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useState } from "react";

interface CreateModalProps<T extends Record<string, any>> {
    columns: MRT_ColumnDef<T>[];
    onClose: () => void;
    onSubmit: (values: T) => void;
    open: boolean;
}

//example of creating a mui dialog modal for creating new rows
const CreateModal = <T extends Record<string, any>>({
    open,
    columns,
    onClose,
    onSubmit,
}: CreateModalProps<T>) => {
    const [values, setValues] = useState<any>(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {} as any),
    );

    const handleSubmit = () => {
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Crear</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        {columns.map((column) => (
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                variant="standard"
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                        ))}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateModal