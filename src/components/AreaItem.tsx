'use client'
import { Area, useAreaStore } from '@/store/areaStore'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { styled } from '@mui/joy/styles';
import React from 'react'

const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography['body-sm'],
    textAlign: 'center',
    fontWeight: theme.fontWeight.md,
    color: theme.vars.palette.text.secondary,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
    borderRadius: theme.radius.md,
}));

interface props {
    area: Area
}

const AreaItem: React.FC<props> = ({ area }) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: area.name });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <Item
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >{area.name}</Item>
    )
}

export default AreaItem