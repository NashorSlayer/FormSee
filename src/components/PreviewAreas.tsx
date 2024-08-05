"use client"
import { Container, Divider, Sheet, Stack, Typography } from '@mui/joy'
import React, { useState } from 'react'
import AreaPillBar from './AreaPillBar'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { BarChart } from '@mui/x-charts/BarChart';
import { dataSetAreas } from '@/util/constants'

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

    const [list, setList] = useState<string[]>(optionsList)

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

    return (

        <Container sx={{
            display: "flex ",
            flexDirection: "column",
        }} >
            <Sheet sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Typography level='h2' sx={{ textAlign: 'center' }}>Title</Typography>
                <Typography level='h3' sx={{ textAlign: 'center' }}>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet molestias autem doloribus temporibus veniam quisquam, illo cumque fuga, aperiam corporis eveniet ipsam. Error nam ab quis eum aliquid nulla iste.</Typography>
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
                        <BarChart
                            dataset={dataSetAreas}
                            series={[{ dataKey: "time_end", label: "Time End (years)", color: "#8884d8" }]}
                            layout="horizontal"
                            grid={{ vertical: true }}
                            yAxis={[{ scaleType: "band", dataKey: "area" }]}
                            {...chartSetting}
                        />
                    </div>
                </DndContext>
            </Container>
        </Container>
    )
}

export default PreviewAreas