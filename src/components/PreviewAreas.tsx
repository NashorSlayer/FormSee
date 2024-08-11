"use client"
import { Box, Button, Container, Divider, Sheet, Stack, Typography } from '@mui/joy'
import React, { useState } from 'react'
import AreaPillBar from './AreaPillBar'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { BarChart } from '@mui/x-charts/BarChart';
import { useFormStore } from '@/store/formStore'
import { useRouter } from 'next/navigation'
import AreaList from './AreaListPreview'
import TimelineArea from './TimelineArea'

const PreviewAreas: React.FC = () => {


    const router = useRouter()
    const { form } = useFormStore()
    const { title, description } = form

    const { prevStep } = useFormStore();

    const handleBack = () => {
        prevStep()
        router.refresh()
    }

    return (
        <Box sx={{
            display: "flex",
            padding: "1rem",
            height: "100vh",
            width: "100vw",
            margin: "2",
        }}>
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
        </Box >

    )
}

export default PreviewAreas