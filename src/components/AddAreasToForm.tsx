"use client"
import { FC, HTMLAttributes, SyntheticEvent, useState } from 'react'
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    Typography,
    createFilterOptions,
    AutocompleteOption,
    ListItemDecorator,
    AutocompleteRenderOptionState,
} from '@mui/joy'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DisplayAreasTable from './DisplayAreasTable';
import { useFormStore } from '@/store/formStore';
import { useRouter } from 'next/navigation';
import { Area, useAreaStore } from '@/store/areaStore';
import Add from '@mui/icons-material/Add';
import { FilterOptionsState } from '@mui/material';

//TODO: Verify list and disable next button, if list is empty
//TODO: wouldn't add duplicated area

const AddAreasToForm: FC = () => {
    const filter = createFilterOptions<Area>();

    const { prevStep, nextStep } = useFormStore();
    const { addArea, clearAreas } = useAreaStore();
    const { areasForm } = useAreaStore(
        (state) => ({
            areasForm: state.areasForm
        })
    )
    const router = useRouter()


    const handleBack = () => {
        prevStep()
        router.refresh()
    }

    const handleNext = () => {

        nextStep()
        router.refresh()
    }



    const handleOptionLabel = (option: string | Area) => {
        if (typeof option === "string") {
            return option
        }
        if (option.inputValue) {
            return option.inputValue
        }
        return option.name
    }

    const handleFilteredOptons = (options: Array<Area>, params: FilterOptionsState<Area>) => {
        const filtered = filter(options, params)

        const { inputValue } = params

        const isExisting = options.some((option) => inputValue === option.name)
        if (params.inputValue !== '' && !isExisting) {
            filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
            })
        }
        return filtered
    }

    const handleChange = (event: SyntheticEvent<Element, Event>, newValue: string | Area | null) => {
        if (typeof newValue === 'string') {
            addArea(newValue)
        } else if (newValue && newValue.inputValue) {
            addArea(newValue.inputValue)
        } else if (newValue) {
            addArea(newValue.name)
        }
    }

    const handleRenderOption = (props: Omit<HTMLAttributes<HTMLLIElement>, "color">, option: Area, state: AutocompleteRenderOptionState) => {
        return (
            <AutocompleteOption {...props}>
                {option.name?.startsWith('Add "') &&
                    (
                        <ListItemDecorator>
                            <Add />
                        </ListItemDecorator>
                    )}
                {option.name}
            </AutocompleteOption>
        )
    }
    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Box>
                <Typography level='h2'>Areas</Typography>
                <Typography level='h4'>Select Areas to show in Forms</Typography>
            </Box>
            <FormControl id="free-solo-with-text-demo">
                <Autocomplete
                    id='areas'
                    startDecorator={<DashboardCustomizeIcon />}
                    placeholder='select areas'
                    onChange={handleChange}
                    filterOptions={handleFilteredOptons}
                    selectOnFocus
                    blurOnSelect
                    handleHomeEndKeys
                    options={areasForm}
                    getOptionLabel={handleOptionLabel}
                    renderOption={handleRenderOption}
                />
            </FormControl>
            <Box>
                <DisplayAreasTable />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button color='danger' onClick={handleBack}>Back</Button>
                <Button onClick={clearAreas} color="warning">Clear</Button>
                <Button onClick={handleNext} color="primary">Next</Button>
            </Box>
        </div>
    )
}

export default AddAreasToForm