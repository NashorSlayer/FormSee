"use client"
import { Box, Button, Container, Divider, Sheet, Stack, Typography } from '@mui/joy'
import React, { useState } from 'react'
import AreaPillBar from './AreaPillBar'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { BarChart } from '@mui/x-charts/BarChart';
import { useFormStore } from '@/store/formStore'
import { useRouter } from 'next/navigation'

interface props {
    optionsList: string[]
}


const chartSetting = {
    xAxis: [
        {
            label: 'Areas (years)',
            dataKey: "time_start",
        },
    ],
    width: 600,
    height: 400,
};

const PreviewAreas: React.FC<props> = ({ optionsList }) => {


    const router = useRouter()
    const [list, setList] = useState<string[]>(optionsList)
    const { prevStep, nextStep } = useFormStore();

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (!active.id !== over.id) {
            setList((items) => {
                const oldIndex = list.findIndex((item) => item === active.id)
                const newIndex = list.findIndex((item) => item === over.id)
                console.log(arrayMove(items, oldIndex, newIndex))
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }


    const handleBack = () => {
        prevStep()
        router.refresh()
    }

    const handleSubmit = () => {

    }

    return (

        <Container sx={{
            display: "flex ",
            flexDirection: "column",
        }} >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                    onClick={handleBack}
                    color="danger"
                >Back</Button>
                <Button
                    color="success"
                >Save</Button>
            </Box>
            <Sheet sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Typography level='h2' sx={{ textAlign: 'center' }}>Formulario Egresados</Typography>
                <Typography level="h4" sx={{ textAlign: 'center' }}>Formulario para reunir la experiencia de Egresados basado en las posibles Áreas de Égreso</Typography>
            </Sheet>
            <Container sx={{
                display: "flex ",
                flexDirection: "row",
            }} >
                <DndContext
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCenter}
                >
                    <div className='w-1/4 max-h-screen' >
                        <Sheet>
                            <Typography level="inherit" sx={{ textAlign: 'center' }}> Areas List</Typography>
                            <Stack
                                spacing={2}
                                alignItems={'center'}
                                divider={<Divider orientation="horizontal" />}
                            >
                                <SortableContext
                                    items={list}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {optionsList.map((area, index) => (
                                        <AreaPillBar key={index} name={area} />
                                    ))}
                                </SortableContext>
                            </Stack>
                        </Sheet>
                    </div>
                    <Divider orientation="vertical" />
                    <div className='w-screen max-h-screen flex justify-center items-center'>

                    </div>
                </DndContext>
            </Container>
        </Container>
    )
}

export default PreviewAreas