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
import { Area, useAreaStore } from '@/store/AreasStore';
import Add from '@mui/icons-material/Add';
import { FilterOptionsState } from '@mui/material';


const AddAreasToForm: FC = () => {

    const [value, setValue] = useState<Area | null>(null);
    const filter = createFilterOptions<Area>();

    const { prevStep, nextStep } = useFormStore();
    const { getAreas, addArea, removeArea, clearAreas } = useAreaStore();
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



    const handleOptionLabel = (option: any) => {
        if (typeof option === "string") {
            return option
        }
        if (option.inputValue) {
            return option.inputValue
        }
        if (option.name) {
            return option.name
        }
    }

    const handleFilteredOptons = (options: Array<Area>, params: FilterOptionsState<Area>) => {

        const filtered = filter(options, params)
        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
            })
        }
        return filtered
    }

    const handleChange = (event: SyntheticEvent<Element, Event>, newValue: string | Area | null) => {
        console.log("🚀 ~ newValue:", newValue)
        if (typeof newValue === 'string') {
            addArea(newValue)
        } else if (newValue && newValue.inputValue) {

            addArea(newValue.inputValue)
        } else {
            addArea(String(newValue))
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
                    value={value}
                    onChange={handleChange}
                    filterOptions={handleFilteredOptons}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    freeSolo
                    options={areasForm}
                    getOptionLabel={handleOptionLabel}
                    renderOption={handleRenderOption}
                />
            </FormControl>
            <Box>
                <DisplayAreasTable />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                    color='danger'
                    onClick={handleBack}
                >Back
                </Button>
                <Button
                    onClick={clearAreas}
                    color="warning"
                >
                    Clear
                </Button>
                <Button
                    onClick={handleNext}
                    color="primary"
                >Next</Button>
            </Box>
        </div>
    )
}

export default AddAreasToForm