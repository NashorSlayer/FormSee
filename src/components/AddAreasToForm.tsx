"use client"
import { FC, HTMLAttributes, SyntheticEvent } from 'react'
import {
    Autocomplete,
    Box,
    FormLabel,
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
import AutoCompleteInput from './AutoCompleteInput';


const filter = createFilterOptions<Area>();

const AddAreasToForm: FC = () => {

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

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Box>
                <Typography level='h2'>Areas</Typography>
                <Typography level='h4'>Select Areas to show in Forms</Typography>
            </Box>
            <Box>
                <AutoCompleteInput />
            </Box>
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