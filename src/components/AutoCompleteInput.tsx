
import React, { useState } from 'react'
import { useAreaStore } from '@/store/areaStore';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { Box } from '@mui/joy';


const filter = createFilterOptions<AreaInputType>();

const AutoCompleteInput = () => {


    const [value, setValue] = useState<AreaInputType | null>(null);
    const [open, toggleOpen] = useState(false);
    const [dialogValue, setDialogValue] = useState({ name: '', })

    function handleChange(event: React.SyntheticEvent<Element, Event>, newValue: string | AreaInputType) {
        if (typeof newValue === 'string') {
            setTimeout(() => {
                toggleOpen(true);
                setDialogValue({
                    name: newValue
                });
            });
        } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
                name: newValue.inputValue
            });
        } else {
            setValue(newValue);
        }
    }

    const handleModalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDialogValue({
            name: event.target.value,
        });
    }

    const handleClose = () => {
        setDialogValue({
            name: '',
        });
        toggleOpen(false);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addArea(dialogValue.name);
        handleClose();
    }

    const { addArea } = useAreaStore();
    const { areasForm } = useAreaStore((state) => ({
        areasForm: state.areasForm
    }))

    return (
        <Box>
            <FormControl id="free-solo-dialog-demo">
                <FormLabel>Area List</FormLabel>
                <Autocomplete
                    placeholder='Click to Input an Area'
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setTimeout(() => {
                                toggleOpen(true);
                                setDialogValue({
                                    name: newValue
                                });
                            });
                        } else if (newValue && newValue.inputValue) {
                            toggleOpen(true);
                            setDialogValue({
                                name: newValue.inputValue
                            });
                        } else {
                            setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}"`,
                            });
                        }

                        return filtered;
                    }}
                    freeSolo
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={areasForm}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return option.name;
                    }}
                    renderOption={(props, option) => (
                        <AutocompleteOption {...props}>{option.name}</AutocompleteOption>
                    )}
                    sx={{ width: 300 }}
                />
            </FormControl>
            <Modal open={open} onClose={handleClose}>
                <ModalDialog>
                    <form onSubmit={handleSubmit}>
                        <Typography
                            id="basic-modal-dialog-title"
                            component="h2"
                            level="inherit"
                            sx={{ fontSize: '1.25em', mb: '0.25em' }}
                        >
                            Add a new Area
                        </Typography>
                        <Typography
                            id="basic-modal-dialog-description"
                            textColor="text.tertiary"
                            sx={{ mt: 0.5, mb: 2 }}
                        >
                            Did you miss any Area in our list? Please, add it!
                        </Typography>
                        <Stack spacing={1}>
                            <FormControl id="name">
                                <FormLabel>Name</FormLabel>
                                <Input
                                    autoFocus
                                    type='text'
                                    value={dialogValue.name}
                                    onChange={handleModalChange}
                                />
                            </FormControl>
                            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                                <Button variant='plain' color='neutral' onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button type='submit'>Add </Button>
                            </Stack>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </Box>
    );
}

interface AreaInputType {
    inputValue?: string;
    name: string;
}


export default AutoCompleteInput;
