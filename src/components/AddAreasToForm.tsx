"use client"
import React from 'react'
import { Autocomplete, Box, Container, Table, Typography } from '@mui/joy'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { Area, IArea } from '@/types/area.types';
import DisplayAreasTable from './DisplayAreasTable';

interface props {
    optionsList: string[]
}

const AddAreasToForm: React.FC<props> = ({ optionsList }) => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const [value, setValue] = React.useState("")
    const [inputValue, setInputValue] = React.useState("")

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
            <div>
                <Container>
                    <Box>
                        <DisplayAreasTable optionsList={optionsList} />
                    </Box>
                </Container>
            </div>

        </div>
    )
}

export default AddAreasToForm