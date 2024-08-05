"use client"
import React from 'react'
import { Box } from '@mui/joy'
import Chip from '@mui/joy/Chip'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { transform } from 'next/dist/build/swc'


interface props {
    name: string
}


const AreaPillBar: React.FC<props> = ({ name }) => {


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: name
    })


    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }


    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <Chip
                color='primary'
                variant='outlined'
                size='md'
            >
                {name}
            </Chip>
        </div>
    )
}

export default AreaPillBar