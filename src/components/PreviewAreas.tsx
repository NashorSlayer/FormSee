"use client"
import { Box } from '@mui/joy'
import { useState } from 'react'
import AreaPillBar from './AreaPillBar'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { BarChart } from '@mui/x-charts/BarChart';
import { useFormStore } from '@/store/formStore'
import { useRouter } from 'next/navigation'
import AreaList from './AreaListPreview'
import TimelineArea from './TimelineArea'
import { Area, useAreaStore } from '@/store/areaStore'
import { ExperienceItem } from '@/types/types'

const PreviewAreas: React.FC = () => {


    const router = useRouter()
    const { form } = useFormStore()
    const { title, description } = form

    const { areasForm } = useAreaStore((state) => ({
        areasForm: state.areasForm
    }))

    const { setAreasForm } = useAreaStore()

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event


    }

    return (
        <Box sx={{
            display: "flex",
            padding: "1rem",
            height: "100vh",
            width: "100vw",
            margin: "2",
        }}>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <Box sx={{
                    width: "30%",
                    padding: "1rem",
                }}>
                    <AreaList />
                </Box>
                <Box sx={{
                    width: "70%",
                    padding: "1rem",
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                    backgroundColor: "white",
                }}>
                    <TimelineArea />
                </Box>
            </DndContext>
        </Box >

    )
}

export default PreviewAreas