"use client"
import React from 'react'
import { Autocomplete, Box, Button, Container, Table, Typography } from '@mui/joy'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { Area, IArea } from '@/types/area.types';
import DisplayAreasTable from './DisplayAreasTable';
import { useFormStore } from '@/store/formStore';
import { useRouter } from 'next/navigation';

interface props {
    optionsList: string[]
}

const AddAreasToForm: React.FC<props> = ({ optionsList }) => {

    const { prevStep } = useFormStore();
    const router = useRouter()


    const handleBack = () => {
        prevStep()
        router.refresh()
    }

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Typography level='h2'>Areas</Typography>
            <Typography level='h4'>Select Areas to show in Forms</Typography>
            <Autocomplete
                id='areas'
                startDecorator={<DashboardCustomizeIcon />}
                multiple={true}
                options={optionsList}
                placeholder='select areas' />
            <Box>
                <DisplayAreasTable optionsList={optionsList} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    color='danger'
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Button
                    color="primary"
                >Next</Button>
            </Box>
        </div>
    )
}

export default AddAreasToForm